import React from "react";
// import "./style.css";


function DeleteBtn(props) {
  return (
    <span className="add-btn" {...props} role="button" tabIndex="0">
      <i className="fas fa-folder-plus fa-2x"></i>
    </span>
  );
}

export default DeleteBtn;