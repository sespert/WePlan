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
import { getFromStorage } from "../utils/storage";
import SweetAlert from 'react-bootstrap-sweetalert';

//TO DO: display all events of user by default?

class AdminEvent extends Component {

    state = {
        eAdmin:"",
        ePlace: "",
        eSubject: "",
        eDate: "",
        eId: (window.location.pathname).substr(14),
        eNumOfDays: "",
        eStartTime: "",
        eEndTime: "",
        conferences : [],       
        referrer: null,
        userId: null,
    }

    componentDidMount () {
        const obj = getFromStorage('the_main_app');
        const { token }= obj;
        API.findEventSession(token).then(data => {           
            const response = data.data;
            this.setState({
                userId: response.userId
            });
        });
        this.loadEventInfo(this.state.eId);
        this.loadConferences(this.state.eId);
    }
   
    //Helper function to load the info of the current event
    loadEventInfo = id => {
        API.getEventsbyId(id)
        .then(res => {            
            this.setState({ 
                eAdmin: res.data.admin,
                ePlace: res.data.place,
                eSubject: res.data.subject,
                eDate: res.data.date,
                eId: res.data._id,
                eNumOfDays: res.data.numOfDays,
                eStartTime: res.data.startTime,
                eEndTime: res.data.endTime,

            });
         
        })
        .catch(err => console.log(err));
    }

    //Helper function to load the conferences for the current event
    loadConferences = id => {
        API.getConferencesbyEvent(id)
        .then(res=>    
            this.setState({ conferences: res.data.conferences }))
        .catch(err => console.log(err));
    }
  

    handleChange = e => {
        this.setState({[e.target.name] :  e.target.value})
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
    
    render() {       
        const {referrer} = this.state;
        if (referrer) return <Redirect to={referrer} />;
        const eventTime = moment(this.state.eDate, "YYYY MM DD").format('MMMM DD YYYY'); 
        const lengthDays = moment(this.state.eDate, "YYYY MM DD").add(this.state.eNumOfDays, 'days').format('MMMM DD YYYY');
        const firstDay = moment(this.state.eDate, "YYYY MM DD").format('MMMM DD'); 
       

        return (
            <Container>
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
                                delVal={"a"}
                                handleDelBtn = {this.handleDelBtn} 
                            />)
                    })}
                </ConferenceList>
                {this.state.alert}

            </Container>
        )
             
                      
        
    }
}

export default AdminEvent;
