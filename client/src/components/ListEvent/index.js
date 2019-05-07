import React from "react";
import "./style.css";
import { Container, Row, Col } from "../Grid";

// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}

export function ListItem(props) {
  return (

    <li className="list-group-item">
    <Container>
      <Row>
        
        <Col size="xs-8 sm-9">
          <h3>{props.name}</h3>
          <h4>Location: {props.location}</h4>
          <p>
            {props.subject}
          </p>
          <p>{props.date}</p>
          
        </Col>
      </Row>
    </Container>
  </li>



  );
}
