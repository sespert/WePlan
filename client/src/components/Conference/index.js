import React, { Component }  from "react";
import { Input, FormBtn, TextArea } from "../Form";
import API from "../../utils/API";
import SweetAlert from 'react-bootstrap-sweetalert';
import moment from "moment";
import FormErrors from "../FormErrors";
import "./Style.css";


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
            eventId: props.eventId,
            eventName: "",
            alert: null,
            formErrors: {title: "", speakers: "", description: "", room: "", day: "",
            time: "", duration: ""},
            titleValid: false,
            speakersValid: false,
            descriptionValid: false,
            roomValid: false,
            dayValid: false,
            timeValid: false,
            durationValid: false
        }
        // this.handler = props.handler.bind(this);
    }

    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(
            {[name] : value},
            () => { this.validateField(name, value) }
        );
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let titleValid = this.state.titleValid;
        let speakersValid = this.state.speakersValid;
        let descriptionValid = this.state.descriptionValid;
        let roomValid = this.state.roomValid;
        let dayValid = this.state.dayValid;
        let timeValid = this.state.timeValid;
        let durationValid = this.state.durationValid;

        switch(fieldName) {
            case 'title':
                titleValid = value.length > 0;
                fieldValidationErrors.title = titleValid ? '' : ' is empty';
                break;
            case 'speakers':
                speakersValid = (/\D/.test(value));
                fieldValidationErrors.speakers = speakersValid ? '' : ' is invalid';
                break;
            case 'description':
                descriptionValid = value.length > 0;
                fieldValidationErrors.description = descriptionValid ? '' : ' is empty';
                break;
            case 'room':
                roomValid = value.length > 0;
                fieldValidationErrors.room = roomValid ? '' : ' is empty';
                break;
            case 'day':
                dayValid = moment(value, 'MM/DD/YYYY',true).isValid();
                fieldValidationErrors.day = dayValid ? '' : ' is invalid';
                break;
            case 'time':
                timeValid = moment(value, 'h:mm a', true).isValid();
                fieldValidationErrors.time = timeValid ? '' : ' is invalid';
                break;
            case 'duration':
                durationValid = (!/\D/.test(value));
                fieldValidationErrors.duration = durationValid ? '' : ' is invalid';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            titleValid: titleValid,
            descriptionValid: descriptionValid,
            speakersValid: speakersValid,
            roomValid: roomValid,
            dayValid: dayValid,
            timeValid: timeValid,
            durationValid: durationValid
          }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.titleValid  && this.state.descriptionValid && this.state.roomValid && this.state.dayValid && this.state.timeValid && this.state.durationValid});
    }

    handleSubmit = e => {
        e.preventDefault();
       
        if(this.state.title && this.state.description && this.state.room) {
        
            const getAlert = () => (
                <SweetAlert 
                success 
                title="Conference Added Succesfully!" 
                onConfirm={() => this.hideAlert()}
                >
                </SweetAlert>
            );
        
            this.setState({
                alert: getAlert()
            });

            API.getEventsbyId(this.state.eventId)
            .then(res => {
                this.setState({eventName: res.data.name});

                API.saveConference({
                    eventId: this.state.eventId,
                    eventName: this.state.eventName,
                    title: this.state.title,
                    speakers: this.state.speakers,
                    description: this.state.description,
                    room: this.state.room,        
                    day: this.state.day,
                    time: this.state.time,
                    duration: this.state.duration
                })
            })
                .then(() => {
                    console.log(this.state.time)
                    this.props.handler();
                })
                .catch(err => console.log(err))
        } else {
            const getAlert = () => (
                <SweetAlert  
                title="Please fill the required fields" 
                onConfirm={() => this.hideAlert()}
                >
                </SweetAlert>
            );
        
            this.setState({
                alert: getAlert()
            });

        }
    }

    hideAlert() {
        console.log('Hiding alert...');
        this.setState({
          alert: null
        });
    }

    render() {
        return (
            <form id="formFont"> 
            <FormErrors formErrors={this.state.formErrors} />
            <Input name="title" placeholder="Title of the conference (required)" value={this.state.title} onChange={this.handleChange}/>
            <br/>
            <Input name="speakers" placeholder="Speakers" value={this.state.speakers} onChange={this.handleChange}/>
            <br/>
            <TextArea name="description" placeholder="Description of the event (required)" value={this.state.description} onChange={this.handleChange}/>
            <br/>
            <Input name="room" placeholder="Room number (required)" value={this.state.room} onChange={this.handleChange}/> 
            <br/>
            <Input name="day" placeholder="Conference Date: MM/DD/YYYY" value={this.state.day} onChange={this.handleChange}/>               
            <br/>
            <Input name="time" placeholder="Start time: 12:00 AM" value={this.state.time} onChange={this.handleChange}/> 
            <br/>
            <Input name="duration" placeholder="Duration of conference in minutes" value={this.state.duration} onChange={this.handleChange}/> 

            <FormBtn id="eventFontBtn" onClick={this.handleSubmit} disabled={!this.state.formValid} >Add a Conference to Your Event</FormBtn>
            {this.state.alert}
            </form>

            
        )
    }
}  

export default Conference;
