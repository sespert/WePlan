import React , { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Container } from "../components/Grid";
import { List, ListItem } from "../components/ListEvent";
import { ConferenceList, ConferenceListItem } from "../components/ListConferences";
import Conference from "../components/Conference";
import { FormBtn } from "../components/Form";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import moment from 'moment';
import { getFromStorage, deleteFromStorage } from "../utils/storage";
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import { object } from "prop-types";


class SingleEvent extends Component {

    constructor(props) {
        super(props);

        this.state= {
            eAdmin: "",
            eName: "",
            ePlace: "",
            eSubject: "",
            eDate: "",
            eNumOfDays: "",
            eStartTime: "",
            eEndTime: "",
            eId: (window.location.pathname).substr(8),
            conferences : [], 
            userId: null,
            referrer: null,
            alert: null
        }
        this.logout=this.logout.bind(this);

    }

    

    componentDidMount() {
        
        const obj = getFromStorage('the_main_app');
        if (obj){
            const { token }= obj;
            console.log("token didmount: "+ token);
            // API.findEventSession(token).then(data => {   
            axios.get('/../api/user/findsession/'+ token).then(data=> {
                const response = data.data;
                this.setState({
                    userId: response.userId
                });
                console.log("userId did mount"+ this.state.userId);
            });
        } else {
            this.setState({
                userId: null
            });
        }
        this.loadEventInfo(this.state.eId);
        this.loadConferences(this.state.eId);
    }
    
    //Helper function to load the info of the current event
    loadEventInfo = id => {
        API.getEventsbyId(id)
        .then(res => {
            console.log("Event info:");
            console.log(res.data);
            this.setState({ 
                eAdmin: res.data.admin,
                eName: res.data.name,
                ePlace: res.data.place,
                eSubject: res.data.subject,
                eDate: res.data.date,
                eId: res.data._id,
                eNumOfDays: res.data.numOfDays,
                eStartTime: res.data.startTime,
                eEndTime: res.data.endTime,
            });
        }).catch(err => console.log(err));
    }

    //Helper function to load the conferences for the current event
    loadConferences = id => {
        API.getConferencesbyEvent(id)
        .then(res=> 
            this.setState({ conferences: res.data.conferences }))
        .catch(err => console.log(err));
    }


    handleSubmit = e => {
        e.preventDefault();
        this.setState({referrer: '/events'});
    }

    handleClick = e => {
        e.preventDefault();
        this.setState({referrer: '/user/events/'+ this.state.userId})
    }

    logInClick = e => {
        e.preventDefault();
        this.setState({referrer: '/'})
    }

    handleAddBtn = e => {
        e.preventDefault();

        const { userId, eId } = this.state;
        const confId = e.target.id;
        let confArr = [];

        API.getConferencesbyUserId(userId)
        .then(res => res.data.conferences.map(elem => 
            confArr.push(elem._id)))
        .then(() => {
            if (confArr.some(
                function (elem) {
                    return elem === confId
                }
            )) {
                const getAlert = () => (
                    <SweetAlert
                        danger
                        title="This conference is already in your schedule"
                        onConfirm={() => this.hideAlert()}
                    >
                    </SweetAlert>
                );

                this.setState({
                    alert: getAlert()
                });
            } else {

                const getAlert = () => (
                    <SweetAlert
                        success
                        title="You added this conference to your schedule!"
                        onConfirm={() => this.hideAlert()}
                    >
                    </SweetAlert>
                );

                this.setState({
                    alert: getAlert()
                });

                API.saveConfToUser({
                    confId: confId,
                    userId: userId,
                    eId: eId
                })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => console.log(err))
            }
        }).catch(err => console.log(err))   

    }

    
    handleDelBtn = e => {
        e.preventDefault();

        const idBtn = e.target.id;

        const getAlert = () => (
            <SweetAlert 
            warning
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="default"
            title="Are you sure?"
            onConfirm={() => this.deleteFile(idBtn)}
            onCancel={() => this.hideAlert()}
            >
                You will not be able to recover this conference!
            </SweetAlert>
        );
    
        this.setState({
            alert: getAlert()
        }); 
    }

    deleteFile(id) {
        this.hideAlert();

        API.deleteConference(id)
        .then(res => {
            console.log(res)
        })            
        .catch(err => console.log(err))
    }

    hideAlert() {
        console.log('Hiding alert...');
        this.setState({
          alert: null
        });
    }
    

    logout() {
		this.setState({
			isLoading: true,
		});
		const obj = getFromStorage('the_main_app');
		if (obj && obj.token) {
			//Verify token
			console.log(obj);
			const { token } = obj;
			axios.get('/api/user/logout?token=' + token).then(data => {
				const response = data.data;
				console.log("logout response ");
				console.log(response);
				if (response.success) {
                    deleteFromStorage('the_main_app');
					this.setState({
						token: '',
                        isLoading: false,
                        userId: null,
                        referrer:"/"
                    });
                    
					console.log("state token"+this.state.token);
				} else {
					this.setState({
						isLoading: false
					});
				}
			})
		} else {
			this.setState({
				isLoading: false
			});

		}
	}

    render() {
        
        const { userId } = this.state;
        const { eAdmin } = this.state; 
        const {referrer} = this.state;
        

        if (referrer) return <Redirect to={{pathname:referrer, state: { token : this.state.token}}} />;
        const eventTime = moment(this.state.eDate, "YYYY MM DD").format('MMMM DD YYYY'); 
        const lengthDays = moment(this.state.eDate, "YYYY MM DD").add(this.state.eNumOfDays, 'days').format('MMMM DD YYYY');
        const firstDay = moment(this.state.eDate, "YYYY MM DD").format('MMMM DD'); 

        if (userId !== eAdmin ) {
            return (
                <Container > 
                    { userId === null ?  
                        <ul className="navbar-nav flex-row ml-md-auto link-cont">
                            <li className="nav-item">
                                <a className="nav-link logout-link" href="/">Log In</a>
                            </li>
                        </ul> :
                        <ul className="navbar-nav flex-row ml-md-auto link-cont">
                            <li className="nav-item">
                                <a className="nav-link logout-link" onClick={this.logout} href="#">Log Out</a>
                            </li>
                        </ul>}

                    
                    <Jumbotron>
                        <h1>Choose the conferences of {this.state.eName} you want to attend</h1>
                        <List> 
                            <ListItem 
                            key = {this.state.eId}
                            place = {this.state.ePlace}
                            subject = {this.state.eSubject}
                            date = {this.state.eDate} 
                            duration = {this.state.eNumOfDays}
                            endDate = {lengthDays}   
                            eFirstDay = {firstDay} 
                            />
                        </List>
                    </Jumbotron> 

                    <br></br> 
                    <br></br>  
                    <br></br>  
                    <br></br>  
    
                    <h3>Conferences</h3>             
                    <ConferenceList> 
                        {this.state.conferences.map(elem => {
                            return(
                            <ConferenceListItem 
                            key = {elem.title}
                            title = {elem.title}
                            speakers = {elem.speakers}
                            event = {elem.eventId}
                            description = {elem.description}
                            room = {elem.room}
                            date = {elem.day}
                            time = {elem.time}
                            duration = {elem.duration} 
                            handleAddBtn = {this.handleAddBtn} 
                            id = {elem._id}  
                            addVal={"a"}
                            /> 
                            )
                        
                            } )}
                            
                </ConferenceList>
                {this.state.alert}
                
                { userId === null ?
                    <FormBtn onClick={this.logInClick}>Log In</FormBtn> :
                    <FormBtn onClick={this.handleClick}>See my schedule</FormBtn> 
                }
    
                <FormBtn onClick={this.handleSubmit}>Go to List of Events</FormBtn> 
                </Container> 
            );
        }
        return (
            <Container>
                <ul className="navbar-nav flex-row ml-md-auto link-cont">
                    <li className="nav-item">
                        <a className="nav-link logout-link" onClick={this.logout} href="/">Log Out</a>
                    </li>
                </ul>
                <Jumbotron>
                    <h1>Add conferences to {this.state.eName} </h1>
                    <List>
                        <ListItem
                            key={this.state.eId}
                            place={this.state.ePlace}
                            subject={this.state.eSubject}
                            date={eventTime}
                            duration={this.state.eNumOfDays}
                            endDate={lengthDays}
                            eFirstDay={firstDay}
                        />
                    </List>
                </Jumbotron>



                <h3>Fill the form with the information of a conference of {this.state.eName}</h3>

                <Conference eventId={this.state.eId} />
                <FormBtn onClick={this.handleSubmit}>Go to List of Events</FormBtn>

                <ConferenceList>
                    {this.state.conferences.map(elem => {
                        return (
                            <ConferenceListItem
                                key={elem._id}
                                title={elem.title}
                                speakers={elem.speakers}
                                description={elem.description}
                                room={elem.room}
                                date={elem.day}
                                time={elem.time}
                                duration={elem.duration}
                                id = {elem._id}  
                                handleDelBtn = {this.handleDelBtn} 
                                delVal={"a"}
                            />)
                    })}
                </ConferenceList>
                {this.state.alert}
            </Container>
        )
    }
}

export default SingleEvent;