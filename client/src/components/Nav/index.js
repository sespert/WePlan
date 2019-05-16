import React, { Component } from "react";
import './nav.css';
import logo from '../../images/logo.png'



class Nav extends Component {
 
  render() {
    let partial;
    if(this.props.id) {
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
          <a className="navbar-brand" href='/' >
            <img src={logo} height="100" width="150" alt="logo"/> 
          </a>

          <h3 id="legend"> Life can be easy by just using the right tools!</h3>

          {/* <ul className="navbar-nav flex-row ml-md-auto">
            <li className="nav-item">
              <a className="nav-link3" href="/events">Events Guide</a>       
            </li> 
            {partial}
          </ul> */}
      </nav>
    );
}
}
    
export default Nav;
