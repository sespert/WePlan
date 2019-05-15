import React from "react";
import "./listStyle.css";

// This file exports both the List and ListItem components

export function List({ children, styleProp }) {
  return (
    <div className="list-overflow-container"style={styleProp}>
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
