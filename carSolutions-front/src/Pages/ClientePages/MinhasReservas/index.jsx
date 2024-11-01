// src/pages/MinhasReservas/MinhasReservas.jsx
import React, { useState, useEffect } from 'react';
import { getUserReservations, updateReservationStatus } from '../../../services/api';

const MinhasReservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const data = await getUserReservations();
      setReservas(data);
    };
    fetchReservations();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateReservationStatus(id, newStatus);
      setReservas((prev) =>
        prev.map((reserva) =>
          reserva.id === id ? { ...reserva, status: newStatus } : reserva
        )
      );
    } catch (error) {
      alert("Erro ao atualizar status da reserva.");
    }
  };

  return (
    <div>
      <h2>Minhas Reservas</h2>
      {reservas.map((reserva) => (
        <div key={reserva.id}>
          <p>Carro: {reserva.car.modelo}</p>
          <p>Status: {reserva.status}</p>
          <button onClick={() => handleStatusUpdate(reserva.id, 'Cancelada')}>
            Cancelar Reserva
          </button>
        </div>
      ))}
    </div>
  );
};

export default MinhasReservas;
