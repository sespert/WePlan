import React from "react";
import "./style.css";
import { Container, Row, Col } from "../Grid";
import AddBtn from "../AddBtn";
import moment from 'moment';
// This file exports both the List and ListItem components

export function ConferenceList({ children }) {
  return (
    <div className="list-overflow-container">

      <ul className="list-group">{children}</ul>
    </div>
  );
}

 export function ConferenceListItem (props) {
  
    // const endTime = moment(this.state.time, "hh:mm a").add(this.state.duration, 'minutes');
    // const test = moment("11:30 AM", "hh:mm a");
    // console.log("time" + this.state.time);

  return (

    <li className="list-group-item">
    <Container>
      <Row>
        
        <Col size="sm-12">
          <h3>{props.title}</h3>  
          <h4>Room: {props.room}</h4>
          <p>Subject: {props.description}</p>
          <p>Speakers: {props.speakers}</p>
          <p>Date: {moment(props.date, "MM DD YYYY").format('MMMM DD YYYY')}</p>
          <p>From {moment(props.time, "hh:mm a").format("hh:mm a")} to {moment(props.time, "hh:mm a").add(props.duration, 'minutes').format("hh:mm a")}</p>
        
        </Col>
        <AddBtn onClick = {props.handleAddBtn} />
      </Row>
      <br />
      
    </Container>
  </li>



  );
// }
}
