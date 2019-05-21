import React from "react";
// import { Container } from "../Grid";
import "./eventBodyInfo.css";
import image2 from '../../images/image2.png'
import image3 from '../../images/image3.png'

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function EventBodyInfo() 
{
  return (
    <div className="container2">
      <div className="card__image-container">
      <img className="card__image" id="cardImage1" src={image2} alt=""/>

    </div>
  <div className="cards-list grid cols-lg-3 cols-md-2 cols-sm-2">
    <div className="card-item flex"/>
    <div className="card__content">
       <p className="card-desc" id="paragraph1">WePlan team created this cool web site to reduce the work load of the event/conference manager by organizing, managing and displaying the event schedule,  to all the attendees. </p>
    </div>
  </div>

  
  <div className="imageContainer2">
  <img className="cardimage1" id="cardImage2" src={image3} alt=""/>

      <div className="cards-list grid cols-lg-3 cols-md-2 cols-sm-2">
    <div className="card-item flex"/>
      <p className="card-desc" id="paragraph2">Attendees will have the opportunity to log in and have all the information of the event in one page. They can browse the schedule and bookmark their favorite sessions including a 101 with their desire vendor.</p>
    </div>
    </div>
    </div>
  );

}

export default EventBodyInfo;