// src/components/CarDisplay/index.jsx
import React from 'react';
import './index.css';

function CarDisplay({ title, image, subtitle, description, price }) {
  return (
    <div className="car-display">
      <h3 className="car-display-title">{title}</h3>
      <img src={image} alt={subtitle} className="car-display-image" />
      <p className="car-display-subtitle">{subtitle}</p>
      <p className="car-display-description">{description}</p>
      <p className="car-display-price-label">Preço da diária</p>
      <p className="car-display-price">{price}</p>
    </div>
  );
}

export default CarDisplay;
