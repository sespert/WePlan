import React , { Component } from "react";
import { Container } from "../components/Grid";
// import { List, ListItem } from "../components/ListEvent";
import { ConferenceList, ConferenceListItem } from "../components/ListConferences";
import API from "../utils/API";
import moment from 'moment';
import { getFromStorage } from '../utils/storage';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';



class UserEvent extends Component {
    state = {
        conferences : [],
        userId: null
    }
    
    componentDidMount() {

        console.log(this.props.location);
        const obj = getFromStorage('the_main_app');
        const { token }= obj;
        console.log("token didmount: "+ token);
        API.findConferenceSession(token).then(data => {   
        // axios.get('/api/user/findsession/'+token).then(data=> {
            const response = data.data;
            this.setState({
                userId: response.userId
            });
            console.log("userId did mount"+ this.state.userId);
            this.loadConferences(response.userId);
        });
        
        
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

                    }
                    
                    // // this.state.eventName.concat(res.data.name)
                    // })
            )
            // this.state.conferences.map((elem,i) => {
                // elem.eventName = "java"
               
            })
            this.setState({eventName: list})
            console.log(list);
            console.log(this.state.eventName)
           

        })
        // .then(
        //     // API.getEventsbyId()
        // )
        .catch(err => console.log(err));
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
            </Container> 
        )
    }
}

export default UserEvent;