// src/components/CarCard/index.jsx

import './index.css';

const CarCard = ({ car }) => {
    const baseURL = "http://localhost:8000";
  return (
    <div className="car-card">
      <img src={`${baseURL}${car.imagem}`} alt={`${car.modelo}`} className='car-image' />
      <h4 className="car-modelo">{car.modelo}</h4>
      <div className="car-precos">
        {car.preco_venda && (
          <div className="preco-venda">
            <button className="botao-comprar">Comprar</button>
            <span>R$ {car.preco_venda}</span>
          </div>
        )}
        {car.preco_diaria && (
          <div className="preco-aluguel">
            <button className="botao-alugar">Alugar</button>
            <span>R$ {car.preco_diaria}/dia</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCard;
