import React from "react";
import "./RegisterContainer.css";
import planerImage from '../../images/planerImage.png'
function RegisterContainer() 
{
    return(
 
<div className="container">
<div className="row">
  <div className="col">
  <img className="card__image" id="cardImage3" src={planerImage} alt=""/>
  </div>
  <div className="col">
  <img className="card__image" id="cardImage3" src={planerImage} alt=""/>
  </div>
</div>
</div>
 
);

}

export default RegisterContainer;