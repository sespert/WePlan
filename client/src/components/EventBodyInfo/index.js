import React from "react";
import "./eventBodyInfo.css";
import image2 from '../../images/image2.png'
import image3 from '../../images/image3.png'

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function EventBodyInfo() {
  return (
    <div className="container2 row">
      <div className="col-12 col-md-6">
        <img className="card__image img-fluid" id="cardImage1" src={image2} alt="" />
      </div>
      <div className="col-12 col-md-6">
        <img className="cardimage1 img-fluid" id="cardImage2" src={image3} alt="" />
      </div>

    </div>
  );

}

export default EventBodyInfo;