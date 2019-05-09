import React, { Component } from "react";
// import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
// import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
// import { Input, TextArea, FormBtn } from "../components/Form";
import Modal from "../components/Modal";
// import Questions from "./Questions";

class Event extends Component {
  state = {
    events: [],
   
  }

  // componentDidMount() {
  //   this.loadEvents();
  // }

  // loadEvents = () => {
  //   API.getEvents()
  //     .then(res =>
  //       this.setState({ conventions: res.data, title: "", author: "", synopsis: "" })
  //     )
  //     .catch(err => console.log(err));
  // };


  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

 

  render() {
    return (
      <Container>
            <Jumbotron>
              <h1>Let us plan your next event</h1>
            </Jumbotron>
            
            <List>
            {this.state.events.map(eve => {
                  return(
                    <ListItem>
                    <a href={"events/" + eve._id}>
                    <strong>
                    {eve.title} 
                    </strong>
                  </a>                       
                                              
                  </ListItem>
                  )
                })}
            </List>

            <Modal />
      </Container>
    );
  }
}

export default Event;
