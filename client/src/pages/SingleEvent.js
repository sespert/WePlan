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
import axios from 'axios';


class SingleEvent extends Component {

    state= {
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
    }

    componentDidMount() {
        const obj = getFromStorage('the_main_app');
        const { token }= obj;
        console.log("token didmount: "+ token);
        // API.findSession(token).then(data => {   
        axios.get('../api/user/findsession/'+token).then(data=> {
            const response = data.data;
            this.setState({
                userId: response.userId
            });
            console.log("userId did mount"+ this.state.userId);
        });
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
        this.setState({referrer: '/user/events/5cdc8c97219fb81d367050ea'})
    }

    handleAddBtn = e => {
        alert("added");
        e.preventDefault();
        
        API.saveConfToUser({
            confId: e.target.id,
            userId: "5cdc8c97219fb81d367050ea"
        })
        .then(res => {
            console.log(res)
        })            
        .catch(err => console.log(err))

    }

    render() {
        
        const { userId } = this.state;
        const { eAdmin } = this.state; 
        const {referrer} = this.state;
        

        if (referrer) return <Redirect to={referrer} />;
        const eventTime = moment(this.state.eDate, "YYYY MM DD").format('MMMM DD YYYY'); 
        const lengthDays = moment(this.state.eDate, "YYYY MM DD").add(this.state.eNumOfDays, 'days').format('MMMM DD YYYY');
        const firstDay = moment(this.state.eDate, "YYYY MM DD").format('MMMM DD'); 

        if (userId !== eAdmin ) {
            return (
                <Container > 
                    {console.log("User: "+userId)}
                    {console.log("Admin: "+eAdmin)}
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
                            description = {elem.description}
                            room = {elem.room}
                            date = {elem.day}
                            time = {elem.time}
                            duration = {elem.duration} 
                            handleAddBtn = {this.handleAddBtn} 
                            id = {elem._id}  
                            /> 
                            )
                        
                            } )}
                            
                </ConferenceList>
                <FormBtn onClick={this.handleClick}>See my schedule</FormBtn> 
    
                <FormBtn onClick={this.handleSubmit}>Go to List of Events</FormBtn> 
                </Container> 
            );
        }
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
                            />)
                    })}
                </ConferenceList>
            </Container>
        )
    }
}

export default SingleEvent;