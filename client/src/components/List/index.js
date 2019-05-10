import React from "react";
import "./listStyle.css";

// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}

// export function ListItem(props) {
//   return <li className="list-group-item" {...props}>{props.title}</li>;
// }

export function ListItem({ children }) {
  return <li className="list-group-item">{children}</li>
}
