import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';

const ConfirmacaoPagamento = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { car, reservationDetails } = location.state || {};

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="confirmacao-pagamento">
      <div className="header-etapas">
      <span> Resumo da venda </span> ➔ <span> Pagamento </span> ➔ <span className='atual'> Confirmação da venda</span>
      </div>
      <span className="voltar" onClick={handleBackToHome}>Voltar para o início</span>
      <h2>Pagamento</h2>
      <div className="confirmacao-sucesso">
        <div className="icone-sucesso">✔️</div>
        <div>
          <h3>Pagamento Confirmado com Sucesso!</h3>
          <p>Obrigado por escolher a nossa locadora para a sua viagem.<br />Seu pagamento foi processado com êxito e sua reserva está confirmada.</p>
        </div>
      </div>
      <div className="detalhes-reserva">
        <h3>Período de contrato:</h3>
        <div className="detalhe-retirada">
          <span>📍 Retirada</span>
          <p>{reservationDetails.localRetirada}</p>
          <p>📅 {reservationDetails.dataRetirada} - ⏰ {reservationDetails.horarioRetirada}</p>
        </div>
        <div className="detalhe-entrega">
          <span>📍 Entrega</span>
          <p>{reservationDetails.localDevolucao}</p>
          <p>📅 {reservationDetails.dataDevolucao} - ⏰ {reservationDetails.horarioDevolucao}</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacaoPagamento;
