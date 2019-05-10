import React from "react";
import './nav.css';
import logo from '../../images/logo.png'


function Nav() {
  console.log(logo)
  return (
    <nav id="navBar" className="navbar navbar-expand-lg">
      <a className="navbar-brand" href='/' >
      <img   src={logo} height="100" width="150" alt="logo"/> 
      </a>
        <ul className="navbar-nav flex-row ml-md-auto">
          <li className="nav-item">
<<<<<<< HEAD
          <a className="nav-link" href="/">See More Events</a>
          </li>
  
=======
          <a className="nav-link" href="/register">Register</a>
          </li>
          <li className="nav-item">
          <a className="nav-link" href="/">Contact Us</a>
        </li>
>>>>>>> 83b5795944717e41057c173299c8e5a7a7272afb
        </ul>
    </nav>
      );
    }
    
    export default Nav;
