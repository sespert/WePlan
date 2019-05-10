import React, { Component } from "react";
// import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
// import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import FormLogin from "../components/FormLogin";

class Event extends Component {
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
            </Jumbotron>
          
 </article>
 <FormLogin>
              </FormLogin>
            
      </Container>
    );
  }
}

export default Event;
