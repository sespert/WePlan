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

      <img className="card__image" id="cardImage1" src={image2} alt=""/>

  <img className="cardimage1" id="cardImage2" src={image3} alt=""/>

    </div>
  );

}

export default EventBodyInfo;