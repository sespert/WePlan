import React from "react";
import "./listStyle.css";
import logo from "../../images/logo.png"
// import { FormBtn } from "../Form";

// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div className="list-overflow-container" img={logo} >
      <ul className="list-group" >{children}</ul>
      {/* <FormBtn id="addNewEvent" onClick={this.handleSubmit}>Click to add your next event  <i className="far fa-calendar-plus"></i></FormBtn>	 */}
    </div>
  );
}

export function ListItem(props) {
  return (

      <li className="list-group-item" {...props}>
        <a onClick={()=>props.toSingleEvent(props.id)} href="#"  >
          <strong> {props.name}</strong>                     
        </a>
      </li>
  );
}

// export function ListItem({ children }) {
//   return <li className="list-group-item">{children}</li>
// }
