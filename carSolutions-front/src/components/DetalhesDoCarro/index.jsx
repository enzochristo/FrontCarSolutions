// src/components/DetalhesDoCarro/index.jsx

import React from 'react';
import './index.css';

const DetalhesDoCarro = ({ car, onClose }) => {
  if (!car) return null;
  const baseURL = "http://localhost:8000";
  
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Detalhes do Carro</h2>
        <div className="car-details">
          <div className="detail-item">
            <strong>Câmbio:</strong>
            <span>{car.cambio}</span>
          </div>
          <div className="detail-item">
            <strong>Categoria:</strong>
            <span>{car.categoria}</span>
          </div>
          <div className="detail-item">
            <strong>Preço:</strong>
            <span>R$ {car.preco_venda}</span>
          </div>
          <div className="detail-item">
            <strong>Diaria:</strong>
            <span>R$ {car.preco_diaria}</span>
          </div>
          <div className="detail-item">
            <strong>Placa:</strong>
            <span>{car.placa}</span>
          </div>
          <div className="detail-item">
            <strong>Marca:</strong>
            <span>{car.marca}</span>
          </div>
          <div className="detail-item">
            <strong>Combustível:</strong>
            <span>{car.combustivel}</span>
          </div>
          <div className="detail-item">
            <strong>Cor:</strong>
            <span>{car.cor}</span>
          </div>
        </div>
        <div className="car-image-detalhes">
          <img src={`${baseURL}${car.imagem}`} alt={`${car.modelo}`} />
        </div>
        <button onClick={onClose} className="close-button">Fechar</button>
      </div>
    </div>
  );
};

export default DetalhesDoCarro;
