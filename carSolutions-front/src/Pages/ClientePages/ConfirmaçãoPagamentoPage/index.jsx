import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';
import check from '../../../assets/check.png';
import atuallogo from '../../../assets/atuallogo.png';
import calendario from '../../../assets/calendario.png';
import relogio from '../../../assets/relogio.png';

const ConfirmacaoPagamento = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { car, reservationDetails } = location.state || {};

  const handleBackToHome = () => {
    navigate('/');
  };

  const local = () => {
    if (reservationDetails.localRetirada === 'Congonhas') {
      // como faz para quebrar linha em string?
      return 'São Paulo - Aeroporto de Congonhas Av. Miruna 1314, São Paulo, SP, 04084-005'
    }
    else {
      return 'São Paulo - Aeroporto de Guarulhos Rod. Hélio Smidt, s/n - Cumbica, Guarulhos - SP, 07190-100'
    }
  }
  return (
    <div className="confirmacao-pagamento">
      <div className="header-etapas">
      <span> Resumo da venda </span> ➔ <span> Pagamento </span> ➔ <span className='atual'> Confirmação da venda</span>
      </div>
      <span className="voltar" onClick={handleBackToHome}>Voltar para o início</span>
      <div className="tudo">
      <div className="confirmacao-sucesso">
      <h2>Pagamento</h2>
        <div className="icone-sucesso">
          <img src={check} alt="Ícone de confirmação" className='fotocheck'/>
        </div>
        <div>
          <h3>Pagamento Confirmado com Sucesso!</h3>
          <p>Obrigado por escolher a nossa locadora para a sua viagem.<br />Seu pagamento foi processado com êxito e sua reserva está confirmada.</p>
        </div>
      </div>
      <div className="detalhes-reserva">
        <h3>Período de contrato:</h3>
        <div className="detalhe-retirada">
          <span className='lugar'>
            <img src={atuallogo} alt="Ícone de localização" className='icone-loc' />
             Retirada
          </span>
          <p>{local()}</p>
          <div className='dat'>
            <img src={calendario} alt="Ícone de calendário" className='icone-dat' />
            <p>{reservationDetails.dataRetirada}</p>
            <img src={relogio} alt="Ícone de relógio" className='icone-dat' /> 
            <p>{reservationDetails.horarioRetirada}</p>
          </div>
        </div>
        <div className="detalhe-entrega">
          <span className='lugar'>
            <img src={atuallogo} alt="Ícone de localização" className='icone-loc' />
            Entrega
          </span>
          <p>{local()}</p>
          <div className='dat'>
            <img src={calendario} alt="Ícone de calendário" className='icone-dat' />
            <p>{reservationDetails.dataDevolucao}</p>
            <img src={relogio} alt="Ícone de relógio" className='icone-dat' /> 
            <p>{reservationDetails.horarioDevolucao}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ConfirmacaoPagamento;
