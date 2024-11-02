// src/components/BuscaAluguel/BuscaAluguel.jsx
import './index.css';
import { useNavigate } from 'react-router-dom';  // Use 'useNavigate' em vez de 'useHistory'

const BuscaAluguel = () => {
    const navigate = useNavigate();

    const funcaoNavigate = () => {
        // Função que irá verificar se o usuario está ou não logado, caso esteje vai direciona-lo para a página de Produtos, e no oposto para a de login
        const token = localStorage.getItem('access_token');
        if (token) {
            navigate('/cliente/Produtos');
        } else {
            navigate('/LoginPageCliente');
        }
    }
  return (
    <div className="destaque-retirada-devolucao">
      <h3>Aluguel de Carros</h3>
      <div className="retirada-devolucao-inputs">
        <div className="retirada">
          <div className="bloco">
            <label>Local de Retirada:</label>
            <select className='infos-reserva-filtro'
            >
              <option value="">Selecione o local de retirada</option>
              <option value="Congonhas">Aeroporto de Congonhas</option>
              <option value="Guarulhos">Aeroporto de Guarulhos</option>
            </select>
          </div>
          <div className="bloco">
            <label>Data e Horário de Retirada:</label>
            <div className="data-hora">
              <input className='infos-reserva-filtro'
                type="date"
              />
              <input className='infos-reserva-filtro'
                type="time"
              />
            </div>
          </div>
        </div>
        <div className="retirada">
          <div className="bloco">
            <label>Local de Devolução:</label>
            <select className='infos-reserva-filtro'
            >
              <option value="">Selecione o local de devolução</option>
              <option value="Congonhas">Aeroporto de Congonhas</option>
              <option value="Guarulhos">Aeroporto de Guarulhos</option>
            </select>
          </div>
          <div className="bloco">
            <label>Data e Horário de Devolução:</label>
            <div className="data-hora">
              <input className='infos-reserva-filtro'
                type="date"
              />
              <input className='infos-reserva-filtro'
                type="time"
              />
            </div>
          </div>
        </div>
      </div>
      <button className="search-button" onClick={funcaoNavigate}>Buscar</button>
    </div>
  );
};

export default BuscaAluguel;
