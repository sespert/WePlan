import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import FormLogin from "../components/FormLogin";

class Conventions extends Component {
  state = {
    events: [{
      title: "E-commerce Tech",
      date: "April-2019"
    },

    {
      title: "DogsExpo",
      date: "September-2019"
    },
    {
      title: "Merchant2019",
      date: "October-2019"
    },
    {
      title: "GoPro",
      date: "December-2019"
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
        <article class="container">
            <Jumbotron>
            <blockquote>
            <strong>Conference</strong>  <em>information</em>
        </blockquote>
 
              

              <br>
              </br>
              <List>
            {this.state.events.map(eve => {
                  return(
                    <ListItem                       
                      title = {eve.title}                                      
                    />
                  )
                })}
                      
            </List>
            </Jumbotron>
          
 </article>
 <FormLogin>
              </FormLogin>
            
      </Container>
    );
  }
}

export default Conventions;
