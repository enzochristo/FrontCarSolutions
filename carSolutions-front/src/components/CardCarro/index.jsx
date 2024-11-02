// src/components/CarCard/index.jsx
import './index.css';
import { useNavigate } from 'react-router-dom';

const CarCard = ({ car, reservationDetails }) => {
  const navigate = useNavigate();

  const handleComprar = () => {
    navigate('/cliente/ResumoCompra', { state: { car } });
  };

  const handleAlugar = () => {
    console.log("Car Details:", car);
    console.log("Reservation Details in CarCard:", reservationDetails);
  
    if (reservationDetails) {
      navigate('/cliente/ResumoAluguel', { state: { car, reservationDetails } });
    } else {
      alert("Preencha o formulário de busca de aluguel antes de alugar.");
    }
  };
  

  return (
    <div className="car-card">
      <img src={`${car.imagem}`} alt={`${car.modelo}`} className="car-image-produto" />
      <h4 className="car-modelo">{car.modelo}</h4>
      <div className="car-precos">
        {car.preco_venda && (
          <div className="preco-produto">
            <button className='btn-produtos' onClick={handleComprar}>Comprar</button>
            <span>R$ {car.preco_venda}</span>
          </div>
        )}
        {car.preco_diaria && (
          <div className="preco-produto">
            <button className='btn-produtos' onClick={handleAlugar}>Alugar</button>
            <span>R$ {car.preco_diaria}/dia</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCard;
