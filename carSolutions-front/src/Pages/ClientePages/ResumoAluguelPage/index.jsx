// src/pages/ResumoAluguel/ResumoAluguel.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const precoTotal = car.preco_diaria * quantidadeDias;

  const handleProceedToPayment = () => {
    navigate('/cliente/pagamento', { state: { car, reservationDetails, precoTotal } });
  };

  return (
    <div className="resumo-aluguel">
      <h2>Resumo do Aluguel</h2>
      <img src={car.imagem} alt={car.modelo} />
      <p><strong>Carro:</strong> {car.modelo}</p>
      <p><strong>Local de Retirada:</strong> {reservationDetails.localRetirada}</p>
      <p><strong>Data e Hora de Retirada:</strong> {reservationDetails.dataRetirada} - {reservationDetails.horarioRetirada}</p>
      <p><strong>Local de Devolução:</strong> {reservationDetails.localDevolucao}</p>
      <p><strong>Data e Hora de Devolução:</strong> {reservationDetails.dataDevolucao} - {reservationDetails.horarioDevolucao}</p>
      <p><strong>Preço Diária:</strong> R$ {car.preco_diaria}</p>
      <p><strong>Quantidade de Dias:</strong> {quantidadeDias}</p>
      <p><strong>Preço Total:</strong> R$ {precoTotal}</p>
      <button onClick={handleProceedToPayment}>Continuar para Pagamento</button>
    </div>
  );
};

export default ResumoAluguel;
