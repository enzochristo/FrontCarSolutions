// src/pages/ResumoAluguel.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResumoAluguel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { car, filters } = location.state; // Recebe os dados do carro e do aluguel

  const handlePagamento = () => {
    navigate('/cliente/Pagamento', { state: { car, filters } });
  };

  return (
    <div className="resumo-aluguel">
      <h2>Resumo do Aluguel</h2>
      <p>Marca: {car.marca}</p>
      <p>Modelo: {car.modelo}</p>
      <p>Local de Retirada: {filters.localRetirada}</p>
      <p>Data e Hora de Retirada: {filters.dataRetirada} às {filters.horarioRetirada}</p>
      <p>Local de Devolução: {filters.localDevolucao}</p>
      <p>Data e Hora de Devolução: {filters.dataDevolucao} às {filters.horarioDevolucao}</p>
      
      <button onClick={handlePagamento}>Ir para Pagamento</button>
    </div>
  );
};

export default ResumoAluguel;
