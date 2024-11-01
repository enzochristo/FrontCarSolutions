// src/pages/Pagamento/PagamentoPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { criarReserva } from '../../../services/api';

const PagamentoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { car, reservationDetails, precoTotal } = location.state || {};

  const handlePayment = async () => {
    try {
      await criarReserva({
        car: car.id,  // Envia apenas o ID do carro
        data_retirada: reservationDetails.dataRetirada,
        hora_retirada: reservationDetails.horarioRetirada,
        data_devolucao: reservationDetails.dataDevolucao,
        hora_devolucao: reservationDetails.horarioDevolucao,
        local_retirada: reservationDetails.localRetirada,
        local_devolucao: reservationDetails.localDevolucao,
        preco_total: precoTotal,  // Envia o preço total
      });

      alert('Pagamento processado com sucesso!');
      navigate('/cliente/ConfirmacaoPagamento', { state: { car, reservationDetails, precoTotal } });
    } catch (error) {
      console.error("Erro ao criar a reserva:", error);
      alert("Erro ao processar a reserva. Por favor, tente novamente.");
    }
  };

  if (!car || !reservationDetails) {
    return <p>Informações de aluguel incompletas. Por favor, volte e preencha todos os dados.</p>;
  }

  return (
    <div className="pagamento-page">
      <h2>Pagamento do Aluguel</h2>
      <div className="resumo-aluguel">
        <img src={car.imagem} alt={car.modelo} />
        <p><strong>Carro:</strong> {car.modelo}</p>
        <p><strong>Data de Retirada:</strong> {reservationDetails.dataRetirada} - {reservationDetails.horarioRetirada}</p>
        <p><strong>Data de Devolução:</strong> {reservationDetails.dataDevolucao} - {reservationDetails.horarioDevolucao}</p>
        <p><strong>Preço Total:</strong> R$ {precoTotal}</p>
      </div>

      <form className="form-pagamento">
        <h3>Informações de Pagamento</h3>
        <label>
          Nome no Cartão
          <input type="text" required />
        </label>
        <label>
          Número do Cartão
          <input type="text" required />
        </label>
        <label>
          Data de Validade
          <input type="text" placeholder="MM/AA" required />
        </label>
        <label>
          Código de Segurança (CVV)
          <input type="text" required />
        </label>
        <button type="button" onClick={handlePayment}>Confirmar Pagamento</button>
      </form>
    </div>
  );
};

export default PagamentoPage;
