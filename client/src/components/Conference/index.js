import React, { Component }  from "react";
import { Input, FormBtn, TextArea } from "../Form";
import API from "../../utils/API";
// import "./style.css";


class Conference extends Component {

    state = {
        title: "",
        speakers: [],
        decription: "",
        room: "",
        schedule: [{
            day: "",
            time: "",
            duration: ""
        }],
        startTime: "",
        endTime: "",
        referrer: null
    }

    handleChange = e => {
        this.setState({[e.target.name] :  e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault();

        // API.saveConference({
        //     title: this.state.title,
        //     speakers: this.state.speakers,
        //     decription: this.state.description,
        //     room: this.state.room,
        //     schedule: this.state.schedule,
        //     startTime:this.state.startTime,
        //     endTime: this.state.endTime,
        //     }).then(res => )
        //     .catch(err => console.log(err))
    }

    render() {
        return (
            <form>

            <Input name="title" placeholder="Title of the conference (required)" value={this.state.title} onChange={this.handleChange}/>
            <Input name="speakers" placeholder="Speakers" value={this.state.speakers} onChange={this.handleChange}/>
            <TextArea name="description" placeholder="Description of the event (required)" value={this.state.description} onChange={this.handleChange}/>
            <Input name="room" placeholder="Room number (required)" value={this.state.numOfDays} onChange={this.handleChange}/> 
            <Input name="day" placeholder="Conference Date: MM/DD/YYYY" value={this.state.schedule.day} onChange={this.handleChange}/>               
            <Input name="time" placeholder="Start time: 12:00" value={this.state.time} onChange={this.handleChange}/> 
            <Input name="duration" placeholder="Duration" value={this.state.schedule.duration} onChange={this.handleChange}/> 

            <FormBtn onClick={this.handleSubmit}>Add a Conference to Your Event</FormBtn>
            
            </form>

            
        )
    }
}

export default Conference;
