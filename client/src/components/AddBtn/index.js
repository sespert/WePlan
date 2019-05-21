import React from "react";
import "./AddBtn.css";


function AddBtn(props) {
  return (
    <button className="btn" {...props}>
      <i className="fas fa-folder-plus fa-2x" {...props}></i>
    </button>
  );
}

export default AddBtn;