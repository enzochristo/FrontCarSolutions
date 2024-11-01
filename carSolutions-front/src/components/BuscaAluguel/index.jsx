// src/components/BuscaAluguel/BuscaAluguel.jsx
import { useState } from 'react';
import './index.css';
import { getAvailableCars } from '../../services/api';

const BuscaAluguel = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    localRetirada: '',
    horarioRetirada: '',
    dataRetirada: '',
    localDevolucao: '',
    horarioDevolucao: '',
    dataDevolucao: '',
  });

  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };

  // Função para buscar carros disponíveis com base nos filtros
  const handleSearch = async () => {
    const { localRetirada, horarioRetirada, dataRetirada, localDevolucao, horarioDevolucao, dataDevolucao } = filters;
    if (!localRetirada || !horarioRetirada || !dataRetirada || !localDevolucao || !horarioDevolucao || !dataDevolucao) {
      alert("Preencha todos os campos para buscar carros disponíveis.");
      return;
    }

    try {
      // Chama a função para obter carros disponíveis com os parâmetros do filtro
      const availableCars = await getAvailableCars({
        dataRetirada,
        horarioRetirada,
        dataDevolucao,
        horarioDevolucao,
      });
      
      // Passa os carros disponíveis para o componente pai através de `onSearch`
      onSearch(availableCars);
    } catch (error) {
      console.error('Erro ao buscar carros disponíveis:', error);
      alert('Erro ao buscar carros disponíveis. Tente novamente.');
    }
  };

  return (
    <div className="destaque-retirada-devolucao">
      <h3>Aluguel de Carros</h3>
      <div className="retirada-devolucao-inputs">
        <div className="retirada">
          <div className="bloco">
            <label>Local de Retirada:</label>
            <select
              value={filters.localRetirada}
              onChange={(e) => handleFilterChange('localRetirada', e.target.value)}
            >
              <option value="">Selecione o local de retirada</option>
              <option value="Congonhas">Aeroporto de Congonhas</option>
              <option value="Guarulhos">Aeroporto de Guarulhos</option>
            </select>
          </div>
          <div className="bloco">
            <label>Data e Horário de Retirada:</label>
            <div className="data-hora">
              <input
                type="date"
                value={filters.dataRetirada}
                onChange={(e) => handleFilterChange('dataRetirada', e.target.value)}
              />
              <input
                type="time"
                value={filters.horarioRetirada}
                onChange={(e) => handleFilterChange('horarioRetirada', e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="devolucao">
          <div className="bloco">
            <label>Local de Devolução:</label>
            <select
              value={filters.localDevolucao}
              onChange={(e) => handleFilterChange('localDevolucao', e.target.value)}
            >
              <option value="">Selecione o local de devolução</option>
              <option value="Congonhas">Aeroporto de Congonhas</option>
              <option value="Guarulhos">Aeroporto de Guarulhos</option>
            </select>
          </div>
          <div className="bloco">
            <label>Data e Horário de Devolução:</label>
            <div className="data-hora">
              <input
                type="date"
                value={filters.dataDevolucao}
                onChange={(e) => handleFilterChange('dataDevolucao', e.target.value)}
              />
              <input
                type="time"
                value={filters.horarioDevolucao}
                onChange={(e) => handleFilterChange('horarioDevolucao', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <button className="search-button" onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default BuscaAluguel;
