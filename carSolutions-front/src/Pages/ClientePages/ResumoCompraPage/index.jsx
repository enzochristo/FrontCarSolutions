// src/pages/ResumoCompra.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const ResumoCompra = () => {
  const location = useLocation();
  const { car } = location.state; // Recebe os dados do carro via state

  return (
    <div className="resumo-compra">
      <h2>Resumo da Compra</h2>
      <p>Marca: {car.marca}</p>
      <p>Modelo: {car.modelo}</p>
      <p>Preço: R$ {car.preco_venda}</p>
      
      <a
        href={`https://wa.me/5511971662048?text=Olá, estou interessado em comprar o ${car.marca} ${car.modelo}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>Contato via WhatsApp</button>
      </a>
    </div>
  );
};

export default ResumoCompra;
