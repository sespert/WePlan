import React from "react";
import Jumbotron from "../components/Jumbotron";
import { Container } from "../components/Grid";
import QuestionAdmin from "../components/QuestionAdmin";

  
function Admin() {
        return (
            <Container > 
                <Jumbotron>
                    <h1>Tell us all about your event</h1>
                </Jumbotron>             
                <QuestionAdmin/>
            </Container> 
                      
        );
}

export default Admin;