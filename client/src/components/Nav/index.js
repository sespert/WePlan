import React, { Component } from "react";
import './nav.css';
import logo from '../../images/logo.png'

class Nav extends Component {

  render() {
    let partial;
    if (this.props.id) {
      partial = <li className="nav-item-2">
        <a className="nav-link3" href="/">Log Out</a>
      </li>
    } else {
      partial = <li className="nav-item-2">
        <a className="nav-link3" href="/">Log In</a>
      </li>
    }
    return (
      <nav id="navBar" className="navbar navbar-expand-lg">
        <a className="navbar-brand" >
          <img src={logo} height="100" width="150" alt="logo" />
        </a>
        <div className="collapse1 1navbar-collapse" id="navbarText">
          <span className="navbar-text" id="legend">
            Life can be easy by just using the right tools!
          </span>
        </div>
      </nav>
    );
  }
}

export default Nav;
