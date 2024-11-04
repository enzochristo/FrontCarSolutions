import React, { useEffect, useState } from 'react';
import { fetchUserReservations, cancelReservation, getCarById } from '../../../services/api';
import './index.css';

const MinhasReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [sortedReservations, setSortedReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    loadUserReservations();
  }, []);

  const loadUserReservations = async () => {
    try {
      const response = await fetchUserReservations();
      setReservas(response.data);
      setSortedReservations(response.data);
    } catch (error) {
      console.error("Erro ao carregar as reservas do usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sorted = [...sortedReservations].sort((a, b) => {
      const dateA = new Date(a.data_retirada);
      const dateB = new Date(b.data_retirada);
      return newSortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setSortedReservations(sorted);
  };

  const handleCancel = async (reservationId) => {
    const confirmCancel = window.confirm("Tem certeza que deseja cancelar esta reserva?");
    if (confirmCancel) {
      try {
        await cancelReservation(reservationId);
        alert("Reserva cancelada com sucesso!");
        loadUserReservations();
      } catch (error) {
        console.error("Erro ao cancelar a reserva:", error);
        alert("Erro ao cancelar a reserva. Tente novamente.");
      }
    }
  };

  const openModal = async (reserva) => {
    setSelectedReservation(reserva);
    try {
      const carData = await getCarById({ id: reserva.car });
      setSelectedCar(carData);
    } catch (error) {
      console.error("Erro ao carregar os dados do carro:", error);
    }
  };

  const closeModal = () => {
    setSelectedReservation(null);
    setSelectedCar(null);
  };

  return (
    <div className="minhas-reservas-page">
      <div className="header-image">
        <h1 className="page-title">Minhas Reservas</h1>
      </div>
      <button onClick={toggleSortOrder} className="sort-button">
        Ordenar por data: {sortOrder === 'asc' ? 'Mais antiga' : 'Mais recente'}
      </button>
      <div className="reservas-table-container">
        <table className="reservas-table">
          <thead>
            <tr>
              <th>Data de Retirada</th>
              <th>Data de Devolução</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {sortedReservations.map((reserva) => (
              <tr key={reserva.id} onClick={() => openModal(reserva)}>
                <td>{reserva.data_retirada}</td>
                <td>{reserva.data_devolucao}</td>
                <td>{reserva.status}</td>
                <td>
                  {reserva.status === "Em Breve" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancel(reserva.id);
                      }}
                      className="cancel-button"
                    >
                      Cancelar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedReservation && selectedCar && (
        <div className="modal">
          <div className="modal-content">
            <span className="modal-close" onClick={closeModal}>&times;</span>
            <h2 className="modal-title">Detalhes do Carro Reservado</h2>
            <p><strong>Modelo:</strong> {selectedCar.modelo}</p>
            <p><strong>Marca:</strong> {selectedCar.marca}</p>
            <p><strong>Ano:</strong> {selectedCar.ano}</p>
            <p><strong>Tipo de Combustível:</strong> {selectedCar.tipo_combustivel}</p>
            <p><strong>Cor:</strong> {selectedCar.cor}</p>
            <p><strong>Preço da Diária:</strong> R$ {selectedCar.preco_diaria}</p>
            <p><strong>Status da Reserva:</strong> {selectedReservation.status}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MinhasReservas;
