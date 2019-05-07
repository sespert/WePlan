import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { FormBtn } from "../components/Form";
import { Redirect } from "react-router-dom";

//TO DO: Add list of events of the logged user

class EventsList extends Component {
    state={
        events: [{
            title: "Merchant2019",
            date: "Sep2019"
          },
          {
            title: "DogsExpo",
            date: "Oct2019"
          }
            ],
            referrer: null

    }

    // componentDidMount() {
    //     this.loadEvents();
    // }

    // loadEvents = () => {
    //     API.getEvents()
    //     .then(res =>
    //         this.setState({ events: res.data })
    //     )
    //     .catch(err => console.log(err));
    // };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({referrer: '/admin'});
        //set state of user to admin in this step and send info to DB???
      }

    render() {
        const {referrer} = this.state;
        if (referrer) return <Redirect to={referrer} />;

        return (
            <Container>
            <Jumbotron>
              <h1>Click to see the info of an event</h1>
            </Jumbotron>
            <List>                
            {this.state.events.map(eve => {
                  return(
                    <ListItem key={eve._id}>
                      <a href={"events/" + eve._id}>
                        <strong>
                          {eve.title}
                        </strong>
                      </a>                      
                                           
                    </ListItem>
                  )
                })}
            </List>

            <FormBtn onClick={this.handleSubmit}>Add New Event</FormBtn>

      </Container>
        )
    }
}

export default EventsList;
