import React, { Component } from "react";
import { Container } from "../components/Grid";
import QuestionAdmin from "../components/QuestionAdmin";
import { FormBtn } from "../components/Form";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import Container4 from "../components/AdminNewEvent";

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
      console.log("userId to be saved as admin " + this.state.userId);
    });

  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ referrer: '/events' });
  }
  render() {
    const { token, referrer } = this.state;
    if (referrer) return <Redirect to={{ pathname: referrer, state: { token: this.state.token } }} />;

    return (
      <Container >
        <Container4>
          { console.log("userId on Admin.js " + this.state.userId) }
          <h3 id="effectFontBackground3"> Tell us all about your event</h3>
              
      
          {/* <div id="questionAdmin"> */}
            <QuestionAdmin adminId={this.state.userId} token={this.state.token} />
          {/* </div>
          <div > */}
            <FormBtn id="buttonsEvent" onClick={this.handleSubmit}>Go to List of Events</FormBtn>
          {/* </div> */}
        </Container4>
      </Container>

    );
  }
}

export default Admin;