import React , { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Container } from "../components/Grid";
import { List, ListItem } from "../components/ListEvent";
import { ConferenceList, ConferenceListItem } from "../components/ListConferences";
import { FormBtn } from "../components/Form";
import { Redirect } from "react-router-dom";
import API from "../utils/API";


class SingleEvent extends Component {

    state= {
        eName: "",
        ePlace: "",
        eSubject: "",
        eDate: "",
        eId: "",
        conferences : [], 
        referrer: null,
    }

    componentDidMount() {
        const urlString = window.location.pathname;
        const urlCut = urlString.substr(8);
        console.log(urlCut);
        this.loadEventInfo(urlCut);
        this.loadConferences(urlCut);
    }
    
    //Helper function to load the info of the current event
    loadEventInfo = id => {
        API.getEventsbyId(id)
        .then(res => {            
            this.setState({ 
                eName: res.data.name,
                ePlace: res.data.place,
                eSubject: res.data.subject,
                eDate: res.data.date,
                eId: res.data._id
            });
        }).catch(err => console.log(err));
    }

    //Helper function to load the conferences for the current event
    loadConferences = id => {
        API.getConferencesbyEvent(id)
        .then(res=>  
            // console.log(res.data))

            this.setState({ conferences: res.data.conferences }))
        .catch(err => console.log(err));
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
                    <h1>Choose the conferences of {this.state.eName} you want to attend</h1>
                    <List> 
                        <ListItem 
                        key = {this.state.eId}
                        place = {this.state.ePlace}
                        subject = {this.state.eSubject}
                        date = {this.state.eDate}               
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