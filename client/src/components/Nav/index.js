import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <a className="navbar-brand" href="/">
        WePlan
      </a>
        <ul className="navbar-nav flex-row ml-md-auto">
          <li className="nav-item">
          <a className="nav-link" href="/">Login</a>
          </li>
          <li className="nav-item">
          <a className="nav-link" href="/">Register</a>
        </li>
        </ul>
    </nav>
      );
    }
    
    export default Nav;
