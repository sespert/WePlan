import React, { Component } from "react";
import "./formLogin.css";
import API from "../../utils/API";

//Exports the login form
class FormLogin extends Component {

  state = {
    email: "",
    userId: "",
    referrer: null
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.email && this.state.password) {

      API.getExactEmail({
        email: this.state.email
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    } else {
      alert("Please enter missing fields")
    }
  }

  render() {

    return (

      <form id="form1" className="col-5">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Login</label>
          <input type="email" className="form-control" aria-describedby="emailHelp" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
        </div>

        <button type="submit" id="buttom" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
        <br></br>
        <br></br>
        <a className="link" id="registerLink" href="/register">Click to Register</a>
      </form>
    );
  }
}

export default FormLogin;