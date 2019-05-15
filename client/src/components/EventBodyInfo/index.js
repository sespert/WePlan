import React from "react";
// import { Container } from "../Grid";
import "./eventBodyInfo.css";


// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function EventBodyInfo() 
{
  return (
    <div className="container2">
      <div className="card__image-container">
      <img className="card__image" id="cardImage" src="https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2126&q=80" alt=""/>
      <svg className="card__svg" id="object1" viewBox="0 0 800 500">
      <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#333"/>
      <path className="card__line" d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" strokeWidth="3" fill="transparent"/>
      </svg>
    </div>


  <div className="cards-list grid cols-lg-3 cols-md-2 cols-sm-2">
    <div className="card-item flex"/>
    <div className="card__content">
       <h1 className="card__title">Lorem ipsum</h1>
       <p className="card-desc" id="card1">We plan team created this cool web site to reduce the work load of the event/conference manager by organizing, managing and displaying the event schedule,  to all the attendees. </p>
    </div>
  </div>


    <div className="card-item flex">
      <p className="card-desc" id="card2">Attendees will have the opportunity to log in and have all the information of the event in one page, And 
      can browse the schedule and bookmark their favorite sessions including a 101 with their desire vendor.</p>
    </div>
    </div>
  );

}

export default EventBodyInfo;