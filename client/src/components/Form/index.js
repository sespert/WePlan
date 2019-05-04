import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Label(props) {
  return (
    <div className="form-group">
      <label>{props.children}</label>
    </div>
  );
}

export function Input(props) {
  return (
    <div>
      <input className="form-control" {...props} />
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="20" {...props} />
    </div>
  );
}

export function CheckButton(props) {
  return (
    <div className="form-check">
      <input className="form-check-input" type="radio" name={props.name} id={props.id} value={props.name} {...props}/>
      <label className="form-check-label" for={props.id}>
        {props.labelText}
      </label>
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button {...props} className="btn btn-success">
      {props.children}
    </button>
  );
}
