import React , { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Container } from "../components/Grid";
import { List, ListItem } from "../components/ListEvent";
import { ConferenceList, ConferenceListItem } from "../components/ListConferences";
import Conference from "../components/Conference";
import { FormBtn } from "../components/Form";
import { Redirect } from "react-router-dom";
// import API from "../utils";

//TO DO: display all events of user by default?

class AdminEvent extends Component {
    state = {
        event: [{
            name: "Industrial Exchange 2019",
            place: "Miami Beach Convention Center",
            subject: "Over 2,500 attendees from middle-market industrial companies and the private equity community will meet in Miami Beach in May 2019. Don’t miss out on networking opportunities with the group of high level decision makers.",
            date: "2019-5-6",
            numOfDays: 3,
            startTime: 1200,
            endTime: 1100
        }],
        conferences : [{
            title: "Moneyball: The Art of Winning an Unfair Game",
            speakers: ["Billy Beane"],
            description: "Considered one of the most progressive and talented baseball executives in the game today, Billy Beane has molded the Oakland Athletics into one of professional baseball’s most consistent winners since taking over as General Manager…",
            room: "Ballroom A",
            schedule:"12:55 pm - 1:50 pm",
        }],       
        referrer: null
    }

    // componentDidMount () {
    //     getUserEvent(params.id);
    // }
    // getUserEvent = id => {
    //     API.getEvent(id).then(res => 
    //       this.setState({
    //           event : [{
    //             name: res.name,
    //             place: res.place,
    //             subject: res.subject,
    //             date: res.date,
    //             numOfDays: res.numOfDays,
    //             startTime: res.startTime,
    //             endTime: res.endTime
    //           }]
    //       })
    //     ).catch(err => console.log(err))
    // }

    // handleChange = e => {
    //     this.setState({[e.target.name] :  e.target.value})
    // }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({referrer: '/events'});
    }
    
    render() {       
        const {referrer} = this.state;
        if (referrer) return <Redirect to={referrer} />;

        return (
            <Container > 
                <Jumbotron>
                    <h1>Add conferences to your event</h1>
                </Jumbotron> 
                {!this.state.event.length ? (
                    <h1>No events to display</h1>
                ) : (
                <List> 
                    {this.state.event.map(elem => {
                        return(
                        <ListItem 
                        key = {elem.name}
                        name = {elem.name}
                        location = {elem.place}
                        subject = {elem.subject}
                        date = {elem.date}               
                        /> )
                        })}
               </List>
                )}
                <h3>Fill the form with the information of a conference</h3>
            <Conference />
            <FormBtn onClick={this.handleSubmit}>Go to List of Events</FormBtn>

            {/* {!this.state.conference.length ? ( */}
                    {/* <h1>No conferences to display</h1> */}
                {/* ) : ( */}
                <ConferenceList> 
                    {this.state.conferences.map(elem => {
                        return(
                        <ConferenceListItem 
                        key = {elem.title}
                        title = {elem.title}
                        speakers = {elem.speakers}
                        description = {elem.description}
                        room = {elem.room}
                        schedule = {elem.schedule}               
                        /> )
                        })}
               </ConferenceList>
                {/* )} */}

            </Container> 
                      
        );
    }
}

export default AdminEvent;
