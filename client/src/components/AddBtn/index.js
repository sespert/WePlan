import React from "react";
// import "./style.css";


function AddBtn(props) {
  return (
    <button className="btn" >
      <i className="fas fa-folder-plus fa-2x" {...props}></i>
    </button>
  );
}

export default AddBtn;