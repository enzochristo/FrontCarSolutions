// src/pages/MinhasReservas.jsx
import React, { useEffect, useState } from 'react';
import { fetchUserReservations, cancelReservation } from '../../services/api';

const MinhasReservas = () => {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        const loadReservas = async () => {
            const userReservas = await fetchUserReservations();
            setReservas(userReservas);
        };
        loadReservas();
    }, []);

    const handleCancel = async (reservaId) => {
        await cancelReservation(reservaId);
        setReservas(reservas.map(reserva => reserva.id === reservaId ? { ...reserva, status: 'cancelada' } : reserva));
    };

    return (
        <div>
            <h2>Minhas Reservas</h2>
            {reservas.map(reserva => (
                <div key={reserva.id}>
                    <p>Carro: {reserva.car.modelo}</p>
                    <p>Status: {reserva.status}</p>
                    {reserva.status === 'em_breve' && (
                        <button onClick={() => handleCancel(reserva.id)}>Cancelar</button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MinhasReservas;
