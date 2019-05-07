import React, { Component }  from "react";
import Jumbotron from "../components/Jumbotron";
import { Container } from "../components/Grid";
import QuestionAdmin from "../components/QuestionAdmin";
import { FormBtn } from "../components/Form";
import { Redirect } from "react-router-dom";


  
class Admin extends Component {
    state = {
        referrer: null
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({referrer: '/events'});
      }
      render() {
        const {referrer} = this.state;
        if (referrer) return <Redirect to={referrer} />;
      
        return (
            <Container > 
                <Jumbotron>
                    <h1>Tell us all about your event</h1>
                </Jumbotron>             
                <QuestionAdmin/>
                <FormBtn onClick={this.handleSubmit}>Go to List of Events</FormBtn>

            </Container> 
                      
        );
      }
}

export default Admin;