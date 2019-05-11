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

export function ConferenceListItem(props) {
  return (

    <li className="list-group-item">
    <Container>
      <Row>
        
        <Col size="xs-8 sm-11">
          <h3>{props.title}</h3>
          <h4>Location: {props.room}</h4>
          <p>
            Subject: {props.description}
          </p>
          <p>{props.schedule}</p>
          <br />
        </Col>
        <AddBtn {...props} />
      </Row>
      <br />
      
    </Container>
  </li>



  );
}
