import React from 'react';

const Card = (props) => {
  return (
    <div id="card" className="card">
      <div className="card__location">
        <i className="card__location-icon fas fa-map-marker-alt"></i>
        <h3 className="card__location-text">{props.location}</h3>
      </div>
      <div className="card__info">
        <h3>Reported By: {props.reportedBy}, at {props.reportedAt}</h3>
      </div>
    </div>
  )
}

export default Card;