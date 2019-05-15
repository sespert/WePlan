import React from "react";
import "./listEvent.css";
import { Container, Row, Col } from "../Grid";

// This file exports both the List and ListItem components

export function List({ children }) {
  console.log(children);
  return (
    <div className="container3" >
      <ul className="list-group">{children} </ul>
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
          <h4>Location: {props.place}</h4>
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
