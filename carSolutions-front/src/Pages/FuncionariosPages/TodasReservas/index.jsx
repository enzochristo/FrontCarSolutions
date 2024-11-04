import React, { useEffect, useState } from 'react';
import { fetchAllReservations, updateReservationStatus, getCarById, getUserDataById } from '../../../services/api';
import './index.css';

const StatusAlugueis = () => {
  const [reservas, setReservas] = useState([]);
  const [sortedReservations, setSortedReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [clientEmails, setClientEmails] = useState({});
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    loadAllReservations();
  }, []);

  const loadAllReservations = async () => {
    try {
      const response = await fetchAllReservations();
      setReservas(response.data);

      const emails = {};
      for (const reserva of response.data) {
        const email = await fetchClientEmail(reserva.cliente);
        emails[reserva.cliente] = email;
      }
      setClientEmails(emails);

      const sorted = [...response.data].sort((a, b) => new Date(a.data_retirada) - new Date(b.data_retirada));
      setSortedReservations(sorted);
    } catch (error) {
      console.error("Erro ao carregar reservas:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClientEmail = async (userId) => {
    try {
      const userData = await getUserDataById(userId);
      return userData.email;
    } catch (error) {
      console.error("Erro ao carregar dados do cliente:", error);
      return "Email não encontrado";
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

  const handleStatusUpdate = async (reservationId, newStatus) => {
    try {
      const response = await updateReservationStatus(reservationId, { status: newStatus });
      alert(`Status atualizado para: ${response.data.status}`);

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
    <div className="status-alugueis-page">
      <div className="header-image">
        <h1 className="page-title">Status dos Aluguéis</h1>
      </div>
      <button onClick={toggleSortOrder} className="sort-button">
        Ordenar por data: {sortOrder === 'asc' ? 'Mais antiga' : 'Mais recente'}
      </button>
      <div className="reservas-table-container">
        <table className="reservas-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Data de Retirada</th>
              <th>Data de Devolução</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {sortedReservations.map((reserva) => (
              <tr key={reserva.id} onClick={() => openModal(reserva)}>
                <td>{clientEmails[reserva.cliente] || "Carregando..."}</td>
                <td>{reserva.data_retirada}</td>
                <td>{reserva.data_devolucao}</td>
                <td>{reserva.status}</td>
                <td>
                  {(reserva.status !== "Concluída" && reserva.status !== 'Cancelada') && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusUpdate(reserva.id, "Cancelada");
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

export default StatusAlugueis;
