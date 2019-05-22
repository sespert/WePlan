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
      console.log("userId to be saved as admin "+this.state.userId);
    });

  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ referrer: '/events' });
  }
  render() {
    const { token, referrer } = this.state;
    if (referrer) return <Redirect to={{pathname:referrer, state: { token : this.state.token}}} />;
    // if (referrer && this.state.userId ) return <Redirect to={{pathname: "/events", state: { userId : this.props.location.state.userId}}} />;
    // const { userId } = this.props.location.state.userId;

    return (
      <Container >
        <Container4>

        {
          console.log("userId on Admin.js "+this.state.userId)
        }
<svg width='900' height='200'>
  <filter id='money'>
    <feMorphology in='SourceGraphic' operator='dilate' radius='2' result='expand'/>

    <feOffset in='expand' dx='1' dy='1' result='shadow_1'/>
    <feOffset in='expand' dx='2' dy='2' result='shadow_2'/>
    <feOffset in='expand' dx='3' dy='3' result='shadow_3'/>
    <feOffset in='expand' dx='4' dy='4' result='shadow_4'/>
    <feOffset in='expand' dx='5' dy='5' result='shadow_5'/>
    <feOffset in='expand' dx='6' dy='6' result='shadow_6'/>
    <feOffset in='expand' dx='7' dy='7' result='shadow_7'/>

    <feMerge result='shadow'>
      <feMergeNode in='expand'/>
      <feMergeNode in='shadow_1'/>
      <feMergeNode in='shadow_2'/>
      <feMergeNode in='shadow_3'/>
      <feMergeNode in='shadow_4'/>
      <feMergeNode in='shadow_5'/>
      <feMergeNode in='shadow_6'/>
      <feMergeNode in='shadow_7'/>
      <feMergeNode in='shadow_12'/>
    </feMerge>
    <feFlood flood-color='#ebe7e0'/>
    <feComposite in2='shadow' operator='in' result='shadow'/>

    <feImage x='0' y='0' width='800' height='300' href='https://s3-us-west-2.amazonaws.com/s.cdpn.io/78779/stripes.svg'/>
    <feComposite in2='secondShadow' operator='in' result='secondShadow'/>

    <feMerge>
      <feMergeNode in='secondShadow'/>
      <feMergeNode in='border'/>
      <feMergeNode in='shadow'/>
      <feMergeNode in='SourceGraphic'/>
    </feMerge>
  </filter>

  <text dominant-baseline='middle' text-anchor='middle' x='50%' y='50%'>
  Tell us all about your event
  </text>
</svg>
<div id="questionAdmin">
        <QuestionAdmin  adminId = {this.state.userId} token = {this.state.token} />
        </div>
        <div >
        <FormBtn  id="buttonsEvent" onClick={this.handleSubmit}>List of Events</FormBtn>
        </div>
        </Container4>
      </Container>

    );
  }
}

export default Admin;