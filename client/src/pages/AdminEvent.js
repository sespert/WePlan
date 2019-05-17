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

//TO DO: display all events of user by default?

class AdminEvent extends Component {

    state = {
        ePlace: "",
        eSubject: "",
        eDate: "",
        eId: (window.location.pathname).substr(14),
        eNumOfDays: "",
        eStartTime: "",
        eEndTime: "",
        conferences : [],       
        referrer: null
    }

    componentDidMount () {
        this.loadEventInfo(this.state.eId);
        this.loadConferences(this.state.eId);
    }
   
    //Helper function to load the info of the current event
    loadEventInfo = id => {
        API.getEventsbyId(id)
        .then(res => {            
            this.setState({ 
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
                        key = {this.state.eId}
                        place = {this.state.ePlace}
                        subject = {this.state.eSubject}
                        date = {eventTime}   
                        duration = {this.state.eNumOfDays}
                        endDate = {lengthDays}   
                        eFirstDay = {firstDay}   
                        />
                    </List>
                </Jumbotron> 
                

                
                <h3>Fill the form with the information of a conference of {this.state.eName}</h3>

            <Conference eventId={this.state.eId}/>
            <FormBtn onClick={this.handleSubmit}>Go to List of Events</FormBtn>

                <ConferenceList> 
                    {this.state.conferences.map(elem => {
                        return(
                        <ConferenceListItem 
                        key = {elem._id}
                        title = {elem.title}
                        speakers = {elem.speakers}
                        description = {elem.description}
                        room = {elem.room}
                        date = {elem.day}
                        time = {elem.time}
                        duration = {elem.duration}
                        /> )
                        })}
               </ConferenceList>
               </Container>
                       )
             
                      
        
    }
}

export default AdminEvent;
