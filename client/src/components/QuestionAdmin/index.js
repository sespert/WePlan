import React, { Component }  from "react";
import { Redirect } from "react-router-dom";
import { Input, FormBtn, TextArea } from "../Form";
import "./style.css";
import API from "../../utils/API";


class QuestionAdmin extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: "",
            place: "",
            subject: "",
            date: "",
            numOfDays: "",
            startTime: "",
            endTime: "",
            referrer: null,
            userId: null
        };
    }
    
    handleChange = e => {
        e.preventDefault();
        this.setState({[e.target.name] :  e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault();

        API.saveEvent({
            name: this.state.name,
            place: this.state.place,
            subject: this.state.subject,
            date: this.state.date,
            numOfDays: this.state.numOfDays,
            startTime: this.state.startTime,
            endTime: this.state.endTime            
        })
            .then(res => {
                const eventId = res.data._id;
                console.log(eventId);
                this.setState({referrer: `/admin/events/${eventId}`});
            })
            .catch(err => console.log(err));
    }
      
    render() {
        const {referrer} = this.state;
        if (referrer) return <Redirect to={referrer} />;

        return (
        <form>
            <Input name="name" placeholder="Name of the event (required)" value={this.state.name} onChange={this.handleChange}/>
            <Input name="place" placeholder="Place (required)" value={this.state.place} onChange={this.handleChange}/>
            <TextArea name="subject" placeholder="Description of the event" value={this.state.subject} onChange={this.handleChange}/>
            <Input name="date" placeholder="Event Start Date: MM/DD/YYYY (required)" value={this.state.date} onChange={this.handleChange}/>   
            <Input name="numOfDays" placeholder="Number of Days (required)" value={this.state.numOfDays} onChange={this.handleChange}/>  
            <Input name="startTime" placeholder="Start time: 12:00 (required)" value={this.state.startTime} onChange={this.handleChange}/> 
            <Input name="endTime" placeholder="End time: 12:00 (required)" value={this.state.endTime} onChange={this.handleChange}/> 
            <h2>{this.props.userId}</h2>
            <FormBtn onClick={this.handleSubmit}>Create Event</FormBtn>
        </form>
      
        )
    }
}

export default QuestionAdmin;