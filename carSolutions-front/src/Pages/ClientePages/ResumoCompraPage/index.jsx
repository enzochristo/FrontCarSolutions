import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';
import wpplogo from '../../../assets/whatsapplogo.png';

const ResumoCompra = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { car } = location.state || {};

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="resumo-compra-container">
      <div className="header-etapas-1">
        <span>Resumo da venda</span>
        <span className="voltar" onClick={handleBackToHome}>Voltar para o início</span>
      </div>
      <h2>{car.modelo}</h2>
      <div className="resumo-compra">
        <img src={car.imagem} alt={car.modelo} className="imagem-carro" />
        <div className="detalhes-compra">
          <h3>Resumo do Compra</h3>
          <p><strong>Modelo:</strong> {car.modelo}</p>
          <p><strong>Marca:</strong> {car.marca}</p>
          <p><strong>Ano:</strong> {car.ano}</p>
          <p><strong>Tipo de Combustível:</strong> {car.tipo_combustivel}</p>
          <p><strong>Preço:</strong> R$ {car.preco_venda}</p>
          <a
            href={`https://wa.me/5511971662048?text=Olá, estou interessado em comprar o ${car.marca} ${car.modelo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-link"
          >
            <span>Enviar uma mensagem: </span>
            <img src={wpplogo} alt="WhatsApp" className="whatsapp-logo" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResumoCompra;
