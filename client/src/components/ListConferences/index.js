import React from "react";
import "./style.css";
import { Container, Row, Col } from "../Grid";
import AddBtn from "../AddBtn";
import DeleteBtn from "../DeleteBtn";
import moment from 'moment';

//This file exports the conferences list for when the event creator adds conferences or when the attendee
// wants to attend a conference

export function ConferenceList({ children }) {
  return (
    <div className="list-overflow-container">

      <ul className="list-group">{children}</ul>
    </div>
  );
}

 export function ConferenceListItem (props) {

  return (

    <li className="list-group-item">
    <Container>
      <Row>
        
        <Col size="sm-8">
          <h2>{props.eventName}</h2>
          <h3>Conference: {props.title}</h3>  
          <h4>Room: {props.room}</h4>
          <p>Subject: {props.description}</p>
          <p>Speakers: {props.speakers}</p>
          <p>Date: {moment(props.date, "YYYY MM DD").format('MMMM DD YYYY')}</p>
          <p>From {moment(props.time, "hh:mm a").format("hh:mm a")} to {moment(props.time, "hh:mm a").add(props.duration, 'minutes').format("hh:mm a")}</p>
        
        </Col>
        <AddBtn onClick = {props.handleAddBtn} id={props.id} disabled={!props.addVal}/>  
        <DeleteBtn onClick = {props.handleDelBtn} id= {props.id} disabled={!props.delVal}/>
        
      </Row>
      <br />
      
    </Container>
  </li>

  );

}