// src/components/CarCard/index.jsx
import './index.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const handleComprar = () => {
    navigate('/cliente/ResumoCompra', { state: { car } });
  };

  return (
    <div className="car-card">
      <img src={`${car.imagem}`} alt={`${car.modelo}`} className='car-image-produto' />
      <h4 className="car-modelo">{car.modelo}</h4>
      <div className="car-precos">
        {car.preco_venda && (
          <div className="preco-produto">
            <button onClick={handleComprar}>Comprar</button>
            <span>R$ {car.preco_venda}</span>
          </div>
        )}
        {car.preco_diaria && (
          <div className="preco-produto">
            <Link to='/cliente/Pagamento/' className="botao-produto-car">Alugar</Link>
            <span>R$ {car.preco_diaria}/dia</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCard;