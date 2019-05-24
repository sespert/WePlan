
import React from "react";
import "./RegisterContainer.css";
import plannerImage from '../../images/plannerImage.png';
import participantImage from '../../images/participantImage.png'

function RegisterContainer() {
  return (

    <div className="container-fluid">
      <div className="row">
        <div className="col-3" id="cardImage3div">
          <img className="card__image" id="cardImage3" src={plannerImage} alt="" width="100%" />
        </div>
        <div className="col-3" id="cardImage4div">
          <img className="card__image" id="cardImage4" src={participantImage} alt="" width="100%" />
        </div>
      </div>
    </div>

  );

}

export default RegisterContainer;