import React from "react";
import Jumbotron from "../components/Jumbotron";
import { Container } from "../components/Grid";
import QuestionUser from "../components/QuestionUser";

function Register() {
    
    return (
        <Container >  
            <Jumbotron>
              <h1>Let us plan your next event</h1>
            </Jumbotron>         
            <QuestionUser/>
           
        </Container>           
    );
}

export default Register;


