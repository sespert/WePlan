import React from "react";
import './nav.css';
import logo from '../../images/logo.png'


function Nav() {
  return (
    <nav id="navBar" className="navbar navbar-expand-lg">
        <a className="navbar-brand" href='/' >
          <img src={logo} height="100" width="150" alt="logo"/> 
        </a>
        <ul className="navbar-nav flex-row ml-md-auto">
          <li className="nav-item">
          <a className="nav-link" href="/">See More Events</a>
          </li>
  
        </ul>
    </nav>
      );
  }
    
    export default Nav;
