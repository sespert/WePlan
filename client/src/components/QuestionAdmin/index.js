import React, { Component }  from "react";
import { Redirect } from "react-router-dom";
import { Input, FormBtn, TextArea } from "../Form";
import "./QuestionAdmin.css";
import FormErrors from "../FormErrors";
import API from "../../utils/API";
import moment from "moment";


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
            userId: null,
            formErrors: {name: "", place: "", date: "", numOfDays: "", startTime: "",
            endTime: ""},
            nameValid: false,
            placeValid: false,
            dateValid: false,
            numOfDaysValid: false,
            startTimeValid: false,
            endTimeValid: false,
            formValid: false
        };
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
        let nameValid = this.state.nameValid;
        let placeValid = this.state.placeValid;
        let dateValid = this.state.dateValid;
        let numOfDaysValid = this.state.numOfDaysValid;
        let startTimeValid = this.state.startTimeValid;
        let endTimeValid = this.state.endTimeValid;


        switch(fieldName) {
            case 'name':
                nameValid = value.length > 0;
                fieldValidationErrors.name = nameValid ? '' : ' is empty';
                break;
            case 'place':
                placeValid = value.length > 0;
                fieldValidationErrors.place = placeValid ? '' : ' is empty';
                break;
            case 'date':
                dateValid = moment(value, 'MM/DD/YYYY',true).isValid();
                fieldValidationErrors.date = dateValid ? '' : ' is invalid';
                break;
            case 'numOfDays':
                numOfDaysValid = (!/\D/.test(value));
                fieldValidationErrors.numOfDays = numOfDaysValid ? '' : ' is invalid';
                break;
            case 'startTime':
                startTimeValid = moment(value, 'h:mm a', true).isValid();
                fieldValidationErrors.startTime = startTimeValid ? '' : ' is invalid';
                break;
            case 'endTime':
                endTimeValid = moment(value, 'h:mm a', true).isValid();
                fieldValidationErrors.endTime = endTimeValid ? '' : ' is invalid';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            nameValid: nameValid,
            placeValid: placeValid,
            dateValid: dateValid,
            numOfDaysValid: numOfDaysValid,
            startTimeValid: startTimeValid,
            endTimeValid: endTimeValid
          }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.nameValid  && this.state.placeValid && this.state.dateValid && this.state.numOfDaysValid && this.state.startTimeValid && this.state.endTimeValid});
    }

    handleSubmit = e => {
        e.preventDefault();

        API.saveEvent({
            admin: this.props.adminId,
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
                <FormErrors formErrors={this.state.formErrors} />
                <Input name="name" placeholder="Name of the event (required)" value={this.state.name} onChange={this.handleChange}/>
                <br/>
                <Input name="place" placeholder="Place (required)" value={this.state.place} onChange={this.handleChange}/>
                <br/>
                <TextArea name="subject" placeholder="Description of the event" value={this.state.subject} onChange={this.handleChange}/>
                <br/>
                <Input name="date" placeholder="Event Start Date: MM/DD/YYYY (required)" value={this.state.date} onChange={this.handleChange}/>   
                <br/>
                <Input name="numOfDays" placeholder="Number of Days (required)" value={this.state.numOfDays} onChange={this.handleChange}/>  
                <br/>
                <Input name="startTime" placeholder="Start time: 12:00 AM (required)" value={this.state.startTime} onChange={this.handleChange}/> 
                <br/>
                <Input name="endTime" placeholder="End time: 12:00 AM (required)" value={this.state.endTime} onChange={this.handleChange}/> 
                <h2>{this.props.userId}</h2>
                <br/>
             
         
                <FormBtn id="createE" onClick={this.handleSubmit} disabled={!this.state.formValid} >Create Event</FormBtn>
            </form>
      
        )
    }
}

export default QuestionAdmin;