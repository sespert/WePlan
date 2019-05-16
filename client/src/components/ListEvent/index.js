import React from "react";
import "./listEvent.css";
import { Container, Row, Col } from "../Grid";

// This file exports both the List and ListItem components

export function List({ children }) {
  // console.log(children);
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
          <h4>Date: {props.date}</h4>

          <p>Duration {props.endDate}</p>
          {/* <p>{props.endDate}</p> */}

          {/* {props.duration == 1 ? <p>{props.date}</p> : <p>From {props.date} to {props.endDate}</p>} */}
          
          
          <p>{props.subject}</p>
          
      
        </Col>
      </Row>
    </Container>
  </li>



  );
}
