// src/pages/Pagamento.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createReservation } from '../../services/api';

const Pagamento = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { car, filters } = location.state;

  const handleConfirmarPagamento = async () => {
    try {
      await createReservation({
        carId: car.id,
        ...filters,
      });
      alert("Reserva confirmada!");
      navigate('/cliente/HistoricoReservas');
    } catch (error) {
      console.error("Erro ao criar reserva:", error);
      alert("Erro ao confirmar a reserva.");
    }
  };

  return (
    <div className="pagamento">
      <h2>Pagamento</h2>
      <p>Detalhes do carro: {car.modelo}</p>
      <button onClick={handleConfirmarPagamento}>Confirmar Pagamento</button>
    </div>
  );
};

export default Pagamento;
