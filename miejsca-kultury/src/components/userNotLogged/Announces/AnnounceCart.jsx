import React from "react";

const EventCard = ({ localization, date, dataDescription, description }) => (
  <div className="card mb-3">
    <div className="card-body">
      <h5 className="card-title">{localization}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{date}</h6>
      <p className="card-text">
        <strong>{dataDescription}</strong>
      </p>
      <p className="card-text">{description}</p>
    </div>
  </div>
);

export default EventCard;
