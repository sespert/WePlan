import React from "react";
import "./RegisterContainer.css";
import PlanerImage from '../../images/PlanerImage.png';
import AttendeeImage from '../../images/AttendeeImage.png'
function RegisterContainer() 
{
    return(
 
<div className="container">
<div className="row">
  <div className="col">
  <img className="card__image" id="cardImage3" src={PlanerImage} alt=""/>
  </div>
  <div className="col">
  <img className="card__image" id="cardImage3" src={AttendeeImage} alt=""/>
  </div>
</div>
</div>
 
);

}

export default RegisterContainer;