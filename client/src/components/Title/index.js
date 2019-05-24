import React from "react";
import "./style.css";

function Title({ children } ){
    return(
    <div id="titleFont"
    className="container">
    

         {children}

    </div>
    );
};

export default Title;