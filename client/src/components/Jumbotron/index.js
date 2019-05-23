import React from "react";
import "./jumbotronStyle.css";

function Jumbotron({ children }) {
  return (
    <div id="eventMainDetail" className="jumbotron">
      <div id="fontAdminEvents">
      {children}
    </div>
    </div>
  );
}

export default Jumbotron;
