import React, { Component } from "react";
import { Container } from "../components/Grid";
import QuestionAdmin from "../components/QuestionAdmin";
import { FormBtn } from "../components/Form";
import { Redirect } from "react-router-dom";
import API from "../utils/API";



class Admin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      token: this.props.location.state.token,
      referrer: null,
      userId: null
    }

  }

  componentDidMount() {
    const token = this.state.token;
    console.log(token);
    API.findSession(token).then(data => {
      console.log(data);
      const response = data.data;
      this.setState({
        userId: response.userId
      });
      console.log("userId to be saved as admin "+this.state.userId);
    });

  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ referrer: '/events' });
  }
  render() {
    const { referrer } = this.state;
    if (referrer) return <Redirect to={{ pathname: "/events" }} />;
    // if (referrer && this.state.userId ) return <Redirect to={{pathname: "/events", state: { userId : this.props.location.state.userId}}} />;
    // const { userId } = this.props.location.state.userId;

    return (
      <Container >
        <h1>Tell us all about your event</h1>
        {
          console.log("userId on Admin.js "+this.state.userId)
        }
        <QuestionAdmin adminId = {this.state.userId} />
        <FormBtn onClick={this.handleSubmit}>Go to List of Events</FormBtn>

      </Container>

    );
  }
}

export default Admin;