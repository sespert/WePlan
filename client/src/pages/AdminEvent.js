import React , { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Container } from "../components/Grid";
import QuestionAdmin from "../components/QuestionAdmin";

  
class AdminEvent extends Component {
    state = {
        title: "",
        speakers: [],
        description: "",
        room: "",
        schedule:"",
        referrer: null
    }

    handleChange = e => {
        this.setState({[e.target.name] :  e.target.value})
    }
    
    render() {

    
        return (
            <Container > 
                <Jumbotron>
                    <h1>Choose the conferences</h1>
                </Jumbotron>             
                <QuestionAdmin/>
            </Container> 
                      
        );
    }
}

export default AdminEvent;