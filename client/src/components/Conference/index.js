import React, { Component }  from "react";
import { Input, FormBtn, TextArea } from "../Form";
import API from "../../utils/API";
// import "./style.css";


class Conference extends Component {
    constructor(props) {
        super(props);       
        this.state = {
            title: "",
            speakers: [],
            description: "",
            room: "",
            day: "",
            time: "",
            duration: "",
            eventId: props.eventId   
        }
    }


    handleChange = e => {
        this.setState({[e.target.name] :  e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault();
        API.saveConference({
            eventId: this.state.eventId,
            title: this.state.title,
            speakers: this.state.speakers,
            description: this.state.description,
            room: this.state.room,        
            day: this.state.day,
            time: this.state.time,
            duration: this.state.duration
            })
            .then(res => {
                console.log(res);
                // this.forceUpdate();
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <form>

            <Input name="title" placeholder="Title of the conference (required)" value={this.state.title} onChange={this.handleChange}/>
            <Input name="speakers" placeholder="Speakers" value={this.state.speakers} onChange={this.handleChange}/>
            <TextArea name="description" placeholder="Description of the event (required)" value={this.state.description} onChange={this.handleChange}/>
            <Input name="room" placeholder="Room number (required)" value={this.state.room} onChange={this.handleChange}/> 
            <Input name="day" placeholder="Conference Date: MM/DD/YYYY" value={this.state.day} onChange={this.handleChange}/>               
            <Input name="time" placeholder="Start time: 12:00 AM" value={this.state.time} onChange={this.handleChange}/> 
            <Input name="duration" placeholder="Duration of conference in minutes" value={this.state.duration} onChange={this.handleChange}/> 

            <FormBtn onClick={this.handleSubmit}>Add a Conference to Your Event</FormBtn>
            
            </form>

            
        )
    }
}

export default Conference;
