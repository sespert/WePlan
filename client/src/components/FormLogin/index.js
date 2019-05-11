import React, { Component } from "react";
import "./formLogin.css";
import API from "../../utils/API";

// This file exports the Input, TextArea, and FormBtn components

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
        
        // this.setState({ referrer: '/events' });
        API.getExactEmail({           
            email: this.state.email
        })
        .then(res => {                
            console.log(res);
            // this.setState({userId:res.data._id});
        
        })
        .catch (err => console.log(err));
    } else {
        alert("Please enter missing fields")
    }
}
  render() {
    // const { referrer } = this.state;
    // if ( referrer && this.state.userId ) return <Redirect to={{pathname: "/events", state: { userId : this.state.userId}}} />;
  
  return (
    <form id="form1">
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Login</label>
        <input type="email" className="form-control" aria-describedby="emailHelp" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange}/>

      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
      </div>

      <button type="submit" id="buttom" className="btn btn-primary"  onClick={this.handleSubmit}>Submit</button>
    </form>

  );
  }
}

export default FormLogin;