import React , { Component } from "react";
import { Container } from "../components/Grid";
// import { List, ListItem } from "../components/ListEvent";
import { ConferenceList, ConferenceListItem } from "../components/ListConferences";
// import API from "../utils";

//TODO: Add list of user events

class UserEvent extends Component {
    state = {
        name : "Info2019",
        conferences : [{
            title: "Moneyball: The Art of Winning an Unfair Game",
            speakers: ["Billy Beane"],
            description: "Considered one of the most progressive and talented baseball executives in the game today, Billy Beane has molded the Oakland Athletics into one of professional baseball’s most consistent winners since taking over as General Manager…",
            room: "Ballroom A",
            schedule:"12:55 pm - 1:50 pm",
        }]

    }

    render() {
        return (
            <Container > 
                    <h1>See your agenda</h1>
                <a href={"events/" + this.state._id}>
                        <strong>
                          {this.state.name}
                        </strong>
                      </a>       
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
            </Container> 

        )
    }
}

export default UserEvent;