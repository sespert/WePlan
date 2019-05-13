import React from "react";
import { Container } from "../Grid";
// import "./eventBodyinfo.css";


// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function EventBodyInfo() 
{
  return (
<div className="container2">
        <div className="cards-list grid cols-lg-3 cols-md-2 cols-sm-2">
          <div className="card-item flex">
            <p className="card-desc">Life can be easier just by using the right tools!!</p>
          </div>
          <div className="card-item flex"/>

            <p className="card-desc">We plan team created this cool web site to reduce the work load of the event/conference manager by organizing, managing and displaying the event schedule,  to all the attendees. </p>
          </div>
          <div className="card-item flex">
            <p className="card-desc">Attendees will have the opportunity to log in and have all the information of the event in one page, And 
            can browse the schedule and bookmark their favorite sessions including a 101 with their desire vendor.</p>
          </div>
          </div>
  );

}

export default EventBodyInfo;