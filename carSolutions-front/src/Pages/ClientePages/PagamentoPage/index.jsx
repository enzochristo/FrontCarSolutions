import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { criarReserva } from '../../../services/api';
import './index.css';

const PagamentoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { car, reservationDetails, precoTotal } = location.state || {};

  const [formData, setFormData] = useState({
    nomeCartao: '',
    numeroCartao: '',
    validade: '',
    cvv: '',
  });
  // Calcula a quantidade de dias e o preço total
  const dataRetirada = new Date(reservationDetails.dataRetirada);
  const dataDevolucao = new Date(reservationDetails.dataDevolucao);
  const quantidadeDias = Math.ceil((dataDevolucao - dataRetirada) / (1000 * 60 * 60 * 24));
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'validade' && value.length === 2 && !value.includes('/')) {
      setFormData((prev) => ({ ...prev, validade: value + '/' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const { nomeCartao, numeroCartao, validade, cvv } = formData;

    if (!/^[A-Za-z\s]+$/.test(nomeCartao)) {
      newErrors.nomeCartao = 'Nome deve conter apenas letras';
    }

    if (!/^\d{13,16}$/.test(numeroCartao)) {
      newErrors.numeroCartao = 'Número do cartão deve ter entre 13 e 16 dígitos';
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(validade)) {
      newErrors.validade = 'Validade deve ser no formato MM/AA';
    }

    if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = 'CVV deve ter 3 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (validateForm()) {
      try {
        await criarReserva({
          car: car.id,
          data_retirada: reservationDetails.dataRetirada,
          hora_retirada: reservationDetails.horarioRetirada,
          data_devolucao: reservationDetails.dataDevolucao,
          hora_devolucao: reservationDetails.horarioDevolucao,
          local_retirada: reservationDetails.localRetirada,
          local_devolucao: reservationDetails.localDevolucao,
          preco_total: precoTotal,
        });

        alert('Pagamento processado com sucesso!');
        navigate('/cliente/ConfirmacaoPagamento', { state: { car, reservationDetails, precoTotal } });
      } catch (error) {
        console.error("Erro ao criar a reserva:", error);
        alert("Erro ao processar a reserva. Por favor, tente novamente.");
      }
    }
  };

  if (!car || !reservationDetails) {
    return <p>Informações de aluguel incompletas. Por favor, volte e preencha todos os dados.</p>;
  }

  return (
    <div className="pagamento-page">
      <div className="header-etapas">
        <span> Resumo da venda </span> ➔ <span className='atual'> Pagamento </span> ➔ <span> Confirmação da venda</span>
      </div>      
    <form className="blocos-pagamento" onSubmit={(e) => e.preventDefault()}>
        <div className='form-pagamento'>
          <h3>Cartão de Crédito</h3>
          <label>
            Nome no Cartão
            <input
              type="text"
              name="nomeCartao"
              value={formData.nomeCartao}
              onChange={handleChange}
            />
            {errors.nomeCartao && <span className="error">{errors.nomeCartao}</span>}
          </label>
          <label>
            Número do Cartão
            <input
              type="text"
              name="numeroCartao"
              value={formData.numeroCartao}
              onChange={handleChange}
              maxLength="16"
            />
            {errors.numeroCartao && <span className="error">{errors.numeroCartao}</span>}
          </label>
          <label>
            Validade
            <input
              type="text"
              name="validade"
              value={formData.validade}
              onChange={handleChange}
              maxLength="5"
              placeholder="MM/AA"
            />
            {errors.validade && <span className="error">{errors.validade}</span>}
          </label>
          <label>
            CVV
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              maxLength="3"
            />
            {errors.cvv && <span className="error">{errors.cvv}</span>}
          </label>
        <h4>Política de cancelamento:</h4>
        <p>
          Essa tarifa garante uma condição de preço reduzida mediante a apresentação de um cartão de crédito válido, e aceite das condições de cancelamento abaixo:
          <ul>
          <ol>
            a) Para reservas canceladas com antecedência inferior a 24 horas do horário previsto para a retirada, será cobrada uma taxa de 10% do valor total da reserva (diárias, taxas, opcionais e seguros), limitado ao valor de 1 diária.
          </ol>
          <ol>
            b) Para reservas em que o cliente não compareça para retirada do veículo no dia agendado, será cobrada uma taxa de 25% do valor da reserva (diárias, taxas, opcionais e seguros), limitado ao valor de 1 diária.
          </ol>
          <ol> 
          c) Caso realize o cancelamento da sua reserva em até 04 horas após a criação, não será cobrada taxa de cancelamento.
          </ol>
        </ul>
        </p>
        </div>
        <div className="resumo-aluguel">
          <h3>Resumo do Aluguel</h3>
          <p><strong>Modelo:</strong> {car.modelo}</p>
          <p><strong>Preço por diária:</strong> R$ {car.preco_diaria}</p>
          <p><strong>Dias:</strong> {quantidadeDias}</p>
          <p><strong>Proteção:</strong> R$ 30,00/dia</p>
          <p><strong>Total:</strong> R$ {precoTotal}</p>
          <button className="pagar" type="button" onClick={handlePayment}>Confirmar Pagamento</button>
        </div>
      </form>
    </div>
  );
};

export default PagamentoPage;
