// src/pages/StatusAlugueis/StatusAlugueis.jsx
import React, { useEffect, useState } from 'react';
import { fetchAllReservations, updateReservationStatus } from '../../../services/api';
import './index.css';

const StatusAlugueis = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllReservations();
  }, []);

  const loadAllReservations = async () => {
    try {
      const response = await fetchAllReservations();
      setReservas(response.data);
    } catch (error) {
      console.error("Erro ao carregar reservas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (reservationId, newStatus) => {
    try {
      const response = await updateReservationStatus(reservationId, { status: newStatus });
      alert(response.data.status);
      
      // Atualize o status da reserva diretamente sem recarregar todas as reservas
      setReservas((prevReservas) =>
        prevReservas.map((reserva) =>
          reserva.id === reservationId ? { ...reserva, status: newStatus } : reserva
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar o status da reserva:", error);
      alert("Erro ao atualizar o status. Tente novamente.");
    }
  };

  return (
    <div className="status-alugueis-page">
      <h1>Status dos Aluguéis</h1>
      {loading ? (
        <p>Carregando reservas...</p>
      ) : reservas.length > 0 ? (
        reservas.map((reserva) => (
          <div key={reserva.id} className="reserva-card">
            <h3>{reserva.car.modelo}</h3>
            <p>Cliente: {reserva.cliente.full_name}</p>
            <p>Data de Retirada: {reserva.data_retirada}</p>
            <p>Data de Devolução: {reserva.data_devolucao}</p>
            <p>Local de Retirada: {reserva.local_retirada}</p>
            <p>Local de Devolução: {reserva.local_devolucao}</p>
            <p>Status: {reserva.status}</p>
            {(reserva.status !== "Concluída" && reserva.status !== 'Cancelada') && (
              <>
                <button onClick={() => handleStatusUpdate(reserva.id, "Cancelada")}>Cancelar</button>
              </>
            )}
          </div>
        ))
      ) : (
        <p>Nenhuma reserva encontrada.</p>
      )}
    </div>
  );
};

export default StatusAlugueis;
