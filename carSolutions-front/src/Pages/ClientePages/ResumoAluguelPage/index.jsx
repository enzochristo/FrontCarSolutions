// src/pages/ResumoAluguel/ResumoAluguel.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css'

const ResumoAluguel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { car, reservationDetails } = location.state || {};
  
  console.log("ResumoAluguel - Car:", car);
  console.log("ResumoAluguel - Reservation Details:", reservationDetails);

  if (!car || !reservationDetails) {
    return <p>Informações de aluguel incompletas. Por favor, volte e preencha todos os dados.</p>;
  }

  // Calcula a quantidade de dias e o preço total
  const dataRetirada = new Date(reservationDetails.dataRetirada);
  const dataDevolucao = new Date(reservationDetails.dataDevolucao);
  const quantidadeDias = Math.ceil((dataDevolucao - dataRetirada) / (1000 * 60 * 60 * 24));
  const precoTotal = car.preco_diaria * quantidadeDias + 30.00;

  const handleProceedToPayment = () => {
    navigate('/cliente/pagamento', { state: { car, reservationDetails, precoTotal } });
  };

  return (
    <div className="resumo-aluguel-container">
      <div className="header-etapas">
        <span className='atual'> Resumo da venda </span> ➔ <span> Pagamento </span> ➔ <span> Confirmação da venda</span>
      </div>
      <div className="resumo-aluguel">
        <div className="detalhes-carro">
          <img src={car.imagem} alt={car.modelo} className='imagem-carro' />
        </div>
        <div className="detalhes-preco">
          <div className="informacoes-retirada">
            <h3>Período de contrato:</h3>
              <p><strong>Local de Retirada:</strong> {reservationDetails.localRetirada}</p>
              <p><strong>Data e Hora de Retirada:</strong> {reservationDetails.dataRetirada} - {reservationDetails.horarioRetirada}</p>
              <p><strong>Local de Devolução:</strong> {reservationDetails.localDevolucao}</p>
              <p><strong>Data e Hora de Devolução:</strong> {reservationDetails.dataDevolucao} - {reservationDetails.horarioDevolucao}</p>
          </div>
          <div className="informacoes-retirada">
          <h3>Resumo do Aluguel</h3>
            <p><strong>Modelo:</strong> {car.modelo}</p>
            <p><strong>Preço por Diária:</strong> R$ {car.preco_diaria}</p>
            <p><strong>Quantidade de Dias:</strong> {quantidadeDias}</p>
            <p><strong>Proteção:</strong> R$ 30,00/dia</p>
            <p><strong>Preço Total:</strong> R$ {precoTotal}</p>
          </div>
      <button onClick={handleProceedToPayment}>Continuar para Pagamento</button>
    </div>
  </div>
</div>
  );
};

export default ResumoAluguel;
