// src/pages/MinhasReservas/MinhasReservas.jsx
import React, { useEffect, useState } from 'react';
import { fetchUserReservations, cancelReservation } from '../../../services/api';
import './index.css';

const MinhasReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserReservations();
  }, []);

  const loadUserReservations = async () => {
    try {
      const response = await fetchUserReservations();
      setReservas(response.data);
    } catch (error) {
      console.error("Erro ao carregar as reservas do usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (reservationId) => {
    try {
      await cancelReservation(reservationId);
      alert("Reserva cancelada com sucesso!");
      loadUserReservations(); // Recarrega as reservas para atualizar a lista
    } catch (error) {
      console.error("Erro ao cancelar a reserva:", error);
      alert("Erro ao cancelar a reserva. Tente novamente.");
    }
  };

  return (
    <div className="minhas-reservas-page">
      <h1>Minhas Reservas</h1>
      {loading ? (
        <p>Carregando suas reservas...</p>
      ) : reservas.length > 0 ? (
        reservas.map((reserva) => (
          <div key={reserva.id} className="reserva-card">
            <h3>{reserva.car.modelo}</h3>
            <p>Data de Retirada: {new Date(reserva.data_retirada).toLocaleDateString()}</p>
            <p>Data de Devolução: {new Date(reserva.data_devolucao).toLocaleDateString()}</p>
            <p>Local de Retirada: {reserva.local_retirada}</p>
            <p>Local de Devolução: {reserva.local_devolucao}</p>
            <p>Status: {reserva.status}</p>
            {reserva.status === "Em Breve" && (
              <button onClick={() => handleCancel(reserva.id)}>Cancelar Reserva</button>
            )}
          </div>
        ))
      ) : (
        <p>Você não possui reservas no momento.</p>
      )}
    </div>
  );
};

export default MinhasReservas;
