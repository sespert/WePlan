import React from "react";
import "./style.css";


function DeleteBtn(props) {
  return (
    <button className="btn" {...props}>
    <i className="fas fa-folder-minus fa-2x" {...props}></i>
  </button>
  );
}

export default DeleteBtn;
