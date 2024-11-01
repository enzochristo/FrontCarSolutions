// src/pages/TodasReservas.jsx
import React, { useEffect, useState } from 'react';
import { fetchAllReservations, updateReservationStatus } from '../../services/api';

const TodasReservas = () => {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        const loadReservas = async () => {
            const allReservas = await fetchAllReservations();
            setReservas(allReservas);
        };
        loadReservas();
    }, []);

    const handleUpdateStatus = async (reservaId, status) => {
        await updateReservationStatus(reservaId, status);
        setReservas(reservas.map(reserva => reserva.id === reservaId ? { ...reserva, status } : reserva));
    };

    return (
        <div>
            <h2>Todas as Reservas</h2>
            {reservas.map(reserva => (
                <div key={reserva.id}>
                    <p>Carro: {reserva.car.modelo}</p>
                    <p>Status: {reserva.status}</p>
                    <button onClick={() => handleUpdateStatus(reserva.id, 'concluida')}>Marcar como Concluída</button>
                    <button onClick={() => handleUpdateStatus(reserva.id, 'cancelada')}>Cancelar</button>
                </div>
            ))}
        </div>
    );
};

export default TodasReservas;
