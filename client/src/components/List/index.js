import React from "react";
import "./listStyle.css";
import logo from "../../images/logo.png"

// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div className="list-overflow-container" img={logo} width="300" height="150">
      <ul className="list-group" >{children}</ul>
      
    </div>
  );
}

export function ListItem(props) {
  return (

      <li className="list-group-item" {...props}>
        <a href={"events/" + props.id}  >
        <strong> {props.name}</strong>                     
        </a>
      </li>
  );
}

// export function ListItem({ children }) {
//   return <li className="list-group-item">{children}</li>
// }
