import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <a className="navbar-brand" href="/">
        WePlan
      </a>
        <ul className="navbar-nav flex-row ml-md-auto">
          <li className="nav-item">
          <a className="nav-link" href="/register">Register</a>
          </li>
          <li className="nav-item">
          <a className="nav-link" href="/">Contact Us</a>
        </li>
        </ul>
    </nav>
      );
    }
    
    export default Nav;
