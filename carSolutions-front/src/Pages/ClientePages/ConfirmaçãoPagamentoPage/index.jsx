// src/pages/ConfirmacaoPagamento/ConfirmacaoPagamento.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmacaoPagamento = () => {
  const location = useLocation();
  const { car, reservationDetails, precoTotal } = location.state || {};

  return (
    <div className="confirmacao-pagamento">
      <h2>Pagamento Confirmado!</h2>
      <p>Obrigado pelo seu aluguel. Aqui estão os detalhes:</p>
      <div className="resumo-aluguel">
        <p><strong>Carro:</strong> {car.modelo}</p>
        <p><strong>Data de Retirada:</strong> {reservationDetails.dataRetirada} - {reservationDetails.horarioRetirada}</p>
        <p><strong>Data de Devolução:</strong> {reservationDetails.dataDevolucao} - {reservationDetails.horarioDevolucao}</p>
        <p><strong>Preço Total:</strong> R$ {precoTotal}</p>
      </div>
      <p>Entraremos em contato caso haja qualquer atualização em sua reserva.</p>
    </div>
  );
};

export default ConfirmacaoPagamento;
