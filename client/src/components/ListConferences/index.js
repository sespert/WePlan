import React from "react";
import "./style.css";
import { Container, Row, Col } from "../Grid";
import AddBtn from "../AddBtn";

// This file exports both the List and ListItem components

export function ConferenceList({ children }) {
  return (
    <div className="list-overflow-container">

      <ul className="list-group">{children}</ul>
    </div>
  );
}

 export function ConferenceListItem (props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     // duration: props.schedule.duration,
  //     // time: props.schedule.time,
  //     // day: props.schedule.day,
  //     title: props.title,
  //     room: props.room,
  //     speakers: props.speakers,
  //     description: props.description,
  //     handleAddBtn: props.handleAddBtn
  //   }
  // }
  
  // render() {
    
  //   // const endTime = moment(this.state.time, "hh:mm a").add(this.state.duration, 'minutes');
  //   const test = moment("11:30 AM", "hh:mm a");
  //   console.log("time" + this.state.time);
  //   const dayToShow = this.state.day;

  return (

    <li className="list-group-item">
    <Container>
      <Row>
        
        <Col size="sm-12">
          <h3>{props.title}</h3>  
          <h4>Location: {props.room}</h4>
          <p>
            Subject: {props.description}
          </p>
          <p>Date: </p>
         
        
        </Col>
        <AddBtn onClick = {props.handleAddBtn} />
      </Row>
      <br />
      
    </Container>
  </li>



  );
// }
}
