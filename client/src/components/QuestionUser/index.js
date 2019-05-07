import React, { Component }  from "react";
import { Redirect } from "react-router-dom";
import { Input, FormBtn} from "../Form";
import "./style.css";

class QuestionUser extends Component{

    state = {
        name: "",
        email: "",
        company: "",
        password: "",
        referrer: null

    }

    handleChange = e => {
        this.setState({[e.target.name] :  e.target.value})
      }

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.name && this.state.email && this.state.password) {
            alert("user saved");
            this.setState({referrer: '/events'});
        //   API.saveUserRole({
        //     name: this.state.name,
        //     email: this.state.email,
        //     company: this.state.company,
                // password: this.state.password
        //   })
            // .then(res => ))
            // .catch(err => console.log(err));
        } else {
            alert("Please enter missing fields")
        }
      }


    render() {  
        const {referrer} = this.state;
        if (referrer) return <Redirect to={referrer} />;

        return (
            <form>
                <Input name="name" placeholder="Full Name (required)" value={this.state.name} onChange={this.handleChange}/>
                <Input name="email" placeholder="Email (required)" value={this.state.email} onChange={this.handleChange}/>
                <Input name="company" placeholder="Your Company" value={this.state.company} onChange={this.handleChange} />
                <Input name="password" placeholder="Choose a Password" value={this.state.password} onChange={this.handleChange} />
               
                <FormBtn onClick={this.handleSubmit}>Register</FormBtn>
            </form>
        )
    }
}

export default QuestionUser;