import React , { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Container } from "../components/Grid";
import { List, ListItem } from "../components/ListEvent";
import { ConferenceList, ConferenceListItem } from "../components/ListConferences";
import { FormBtn } from "../components/Form";
import { Redirect } from "react-router-dom";
// import API from "../utils/API";


class SingleEvent extends Component {

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
        }, {
            title: "Delivering Digital Transformation in a Private Equity World",
            speakers: ["Jackson Bond", "Cameron Hulett"],
            description: "Terms such as ’digital transformation’ and ‘Industry 4.0’ have become buzzwords – as the saying goes “if you’re not doing it, you could be Uberized tomorrow”. But how do PE firms and their portfolio companies translate this into real business while remaining within the financial, risk and time constraints of the PE world?",
            room: "Ballroom A",
            schedule:"Monday 4:45 pm - 5:15 pm",
        }], 
        referrer: null
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({referrer: '/events'});
    }

    handleClick = e => {
        e.preventDefault();
        this.setState({referrer: '/user/event/id'})
    }

    handleAddBtn = e => {
        alert("added");
        e.preventDefault();
        // API.saveConferenceAttendee({
        //     save data to database
        // })
        // .then()
    }

    render() {
        const {referrer} = this.state;
        if (referrer) return <Redirect to={referrer} />;
        return (
            <Container > 
                <Jumbotron>
                    <h1>Choose the conferences you want to attend</h1>
                </Jumbotron> 
                <h3>Event</h3>
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
               <h3>Conferences</h3>
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
                        onClick = {this.handleAddBtn}            
                        /> 
                        )
                       
                        } )}
                        
               </ConferenceList>
               <FormBtn onClick={this.handleClick}>See my schedule</FormBtn> 
   
               <FormBtn onClick={this.handleSubmit}>Go to List of Events</FormBtn> 
            </Container> 
        );
    }
}

export default SingleEvent;