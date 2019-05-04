import React, { Component }  from "react";
import { Input, FormBtn, CheckButton } from "../Form";
import "./style.css";

class QuestionUser extends Component{

    state = {
        name: "",
        email: "",
        company: "",
        selectedOption: "Admin"

    }

    handleChange = e => {
        this.setState({[e.target.name] :  e.target.value})
      }

    handleOptionChange = e => {
        this.setState({
            selectedOption: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.name && this.state.email) {
            console.log("user saved: " + this.state.selectedOption)
        //   API.saveUserRole({
        //     name: this.state.name,
        //     email: this.state.email,
        //     company: this.state.company,
                // role: this.state.selectedOption
        //   })
            // .then(res => loadRole(this.state.selectedOption))
            .catch(err => console.log(err));
        }
      }

      loadRole = role => {
        if(role === "Admin") {
            //go to conference creation
        } else if (role === "User") {
            //go to events list
        }
      }

    render() {  
        return (
            <form>
                <Input name="name" placeholder="Full Name (required)" value={this.state.name} onChange={this.handleChange}/>
                <Input name="email" placeholder="Email (required)" value={this.state.email} onChange={this.handleChange}/>
                <Input name="company" placeholder="Your Company" value={this.state.company} onChange={this.handleChange} />
                <div className="radioButtons"> 
                <CheckButton 
                    name="roles"
                    id="1"
                    labelText="Event Organizer"
                    value="Admin"
                    checked={this.state.selectedOption === "Admin"}
                    onChange={this.handleOptionChange}
                />
                <CheckButton 
                    name="roles"
                    id="2"
                    labelText="Attendee"
                    value="User"
                    checked={this.state.selectedOption === "User"}
                    onChange={this.handleOptionChange}
                />
                </div>
                <FormBtn onClick={this.handleSubmit}>Submit</FormBtn>


            </form>
        )
    }
}

export default QuestionUser;