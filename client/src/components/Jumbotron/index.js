import React from "react";
import "./jumbotronStyle.css";

function Jumbotron({ children }) {
  return (
    
    <div id="eventMainDetail"

      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
