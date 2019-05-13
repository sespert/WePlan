import React , { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Container } from "../components/Grid";
import { List, ListItem } from "../components/ListEvent";
import { ConferenceList, ConferenceListItem } from "../components/ListConferences";
import Conference from "../components/Conference";
import { FormBtn } from "../components/Form";
import { Redirect } from "react-router-dom";
import API from "../utils/API";

//TO DO: display all events of user by default?

class AdminEvent extends Component {

    state = {
        eName: "",
        ePlace: "",
        eSubject: "",
        eDate: "",
        eId: "",
        conferences : [],       
        referrer: null
    }

    componentDidMount () {
        const urlString = window.location.pathname;
        const urlCut = urlString.substr(14);
        console.log(urlCut);
        this.loadEventInfo(urlCut);
        this.loadConferences();
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
    loadConferences = () => {
        API.getConferences()
        .then(res=>  
            // console.log(res.data))
            
            this.setState({ conferences: res.data }))
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

        return (
            <Container>
                <Jumbotron>
                    <h1>Add conferences to {this.state.eName} </h1>
                    <List> 
                        <ListItem 
                        key = {this.state.eId}
                        place = {this.state.ePlace}
                        subject = {this.state.eSubject}
                        date = {this.state.eDate}               
                        />
                    </List>
                </Jumbotron> 
                
                <h3>Fill the form with the information of a conference</h3>

            <Conference />
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
                        /> )
                        })}
               </ConferenceList>
               </Container>
                       )
             
                      
        
    }
}

export default AdminEvent;
