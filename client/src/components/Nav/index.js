import React from "react";
import './nav.css';
import logo from '../../images/logo.png'


function Nav() {
  return (
    <nav id="navBar" className="navbar navbar-expand-lg">
        <a className="navbar-brand" href='/' >
          <img src={logo} height="100" width="150" alt="logo"/> 
        </a>
        <h3 id="legend"> Life can be easy by just using the right tools!</h3>

        <ul className="navbar-nav flex-row ml-md-auto">
          <li className="nav-item">
          <a className="nav-link" href="/events">Events Guide</a>
          
          </li>
  
        </ul>
    </nav>
      );
  }
    
    export default Nav;
