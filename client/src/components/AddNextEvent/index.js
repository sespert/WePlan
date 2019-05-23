import React from "react";
import "./AddNextEvent.css";

function EventsAdded({ children } ){
    return(
    <div id="nextEvent"
    className="jumbotron3">
    

         {children}

    </div>
    );
};

export default EventsAdded;