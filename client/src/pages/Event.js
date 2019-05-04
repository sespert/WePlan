import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Modal from "../components/Modal";
import Questions from "./Questions";

class Conventions extends Component {
  state = {
    events: [{
      title: "Merchant2019",
      date: "Sep2019"
    },
    {
      title: "DogsExpo",
      date: "Oct2019"
    }
      ]
  }

  // componentDidMount() {
  //   this.loadConventions();
  // }

  // loadConventions = () => {
  //   API.getConventions()
  //     .then(res =>
  //       this.setState({ conventions: res.data, title: "", author: "", synopsis: "" })
  //     )
  //     .catch(err => console.log(err));
  // };

  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadConventions())
  //     .catch(err => console.log(err));
  // };

  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.title && this.state.author) {
  //     API.saveBook({
  //       title: this.state.title,
  //       author: this.state.author,
  //       synopsis: this.state.synopsis
  //     })
  //       .then(res => this.loadConventions())
  //       .catch(err => console.log(err));
  //   }
  // };

  render() {
    return (
      <Container>
            <Jumbotron>
              <h1>Let us plan your next event</h1>
            </Jumbotron>
            <Modal />
            <List>
            {this.state.events.map(eve => {
                  return(
                    <ListItem                       
                      title = {eve.title}                                      
                    />
                  )
                })}
            </List>
            
      </Container>
    );
  }
}

export default Conventions;
