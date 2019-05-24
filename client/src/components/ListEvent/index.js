import React from "react";
import "./listEvent.css";
import { Container, Row, Col } from "../Grid";

// This file exports both the List and ListItem components

export function List({ children }) {
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

          <Col size="xs-8 sm-12">

            <h4>Location: {props.place}</h4>
            {props.duration === 1 ? <p>{props.date}</p> : <p>From {props.eFirstDay} to {props.endDate}</p>}
            <p>{props.subject}</p>

          </Col>
        </Row>
      </Container>
    </li>
  );
}
