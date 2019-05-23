import React , { Component } from "react";
import { Container } from "../components/Grid";
import { Redirect } from "react-router-dom";
// import { List, ListItem } from "../components/ListEvent";
import { ConferenceList, ConferenceListItem } from "../components/ListSchedule";
import API from "../utils/API";
import moment from 'moment';
import { getFromStorage, deleteFromStorage } from '../utils/storage';
import axios from 'axios';
import { FormBtn } from "../components/Form";
import SweetAlert from 'react-bootstrap-sweetalert';
import { object } from "prop-types";


class UserEvent extends Component {
    constructor(props) {
        super (props);
        this.state = {
            isLoading: true,
            conferences : [],
            userId: null,
            token: this.props.location.state.token,
            referrer: null
        }
        this.logout=this.logout.bind(this);

    }

    componentDidMount() {

        const obj = getFromStorage('the_main_app');
        if (obj){
            const { token }= obj;
            console.log("token did mount: "+ token);
            axios.get('/../api/user/findsession/'+token).then(data=> {
                const response = data.data;
                this.setState({
                    userId: response.userId
                });
                console.log("userId did mount"+ this.state.userId);
                this.loadConferences(this.state.userId);
            });
        } else {
            this.setState({
                userId: null
            });
        }
        
        this.loadConferences(this.state.userId);

    }


    loadConferences = id => {
        const list = [];
        API.getConferencesbyUserId(id) 
        .then(res=> {
            this.setState({ conferences: res.data.conferences })
            console.log(this.state.conferences)
            this.state.conferences.map((elem,i) => {
                API.getEventsbyId(elem.eventId).then(
                    res => {
                        list.push(res.data.name);

                    })
            })
        })
        .catch(err => console.log(err));
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({referrer: '/events'});
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
                You are removing this conference from your schedule.
            </SweetAlert>
        );
    
        this.setState({
            alert: getAlert()
        }); 
     
    }

    deleteFile(id) {
        this.hideAlert();
        console.log("id: " + id);
        console.log("userId: " + this.state.userId);
        API.deleteConfFromUser({
            confId: id,
            userId: this.state.userId
        })
        .then(() => {
            this.loadConferences(this.state.userId);
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
                        referrer: '/'
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
        const { referrer } = this.state;
        const { token } = this.state;
        if (referrer) return <Redirect to={{pathname: referrer, state: { token : this.state.token}}} />;
        
        let bg = require('../images/eventsAdded.png');


        
        return (
            <Container > 
                <ul className="navbar-nav flex-row ml-md-auto link-cont" >					
					<li className="nav-item">
						<a className="nav-link logout-link" onClick={this.logout} href="#" >Log Out</a>  
					</li>
				</ul>
                <div className='jumbotron' style={{backgroundImage: "url("+bg+")"}}>
                <h1 style={{textAlign: "center"}}>See your schedule</h1>
                <a href={"events/" + this.state._id}>
                        <strong>
                          {this.state.name}
                        </strong>
                      </a>    

                <ConferenceList > 
                    {this.state.conferences.map(elem => {
                        return(
                        <ConferenceListItem 
                        key = {elem.title}
                        eventName = {elem.eventName}
                        title = {elem.title}
                        speakers = {elem.speakers}
                        description = {elem.description}
                        room = {elem.room}
                        date = {elem.day}
                        time = {elem.time}
                        duration = {elem.duration} 
                        id = {elem._id} 
                        delVal={"a"}   
                        handleDelBtn = {this.handleDelBtn} 
                        />)
                    })}
               </ConferenceList>
            
               {this.state.alert}
               <FormBtn onClick={this.handleSubmit}>Go to List of Events</FormBtn> 
               </div>
            </Container> 
            
        )
    }
}

export default UserEvent;