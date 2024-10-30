import './index.css';
import { useState, useEffect } from 'react';
import { getAvailableCars } from '../../services/api';


const BuscaAluguel = () => {
    const [filters, setFilters] = useState({
        localRetirada: '',
        horarioRetirada: '',
        dataRetirada: '',
        localDevolucao: '',
        horarioDevolucao: '',
        dataDevolucao: '',
      });
      const [cars, setCars] = useState([]);
    
      useEffect(() => {
        const fetchCars = async () => {
          try {
            const availableCars = await getAvailableCars();
            setCars(availableCars || []); // Garante que 'cars' será um array
          } catch (error) {
            console.error('Erro ao carregar carros disponíveis:', error);
            setCars([]); // Em caso de erro, inicializa 'cars' como um array vazio
          }
        };
        fetchCars();
      }, []);
  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };


    return(      
    <div className="destaque-retirada-devolucao">
        <h3>Aluguel de Carros</h3>
        <div className="retirada-devolucao-inputs">
          <div className='retirada'>
          <div className='bloco'>
            <label>Local de Retirada:</label>
            <select
              value={filters.localRetirada}
              onChange={(e) => handleFilterChange('localRetirada', e.target.value)}
            >
              <option  value="">Selecione o local de retirada</option>
              <option value="Congonhas">Aeroporto de Congonhas</option>
              <option value="Guarulhos">Aeroporto de Guarulhos</option>
            </select>
          </div>
          <div className='bloco'>
            <label>Data e Horário de retirada:</label>
            <div className='Data-hora'>
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
          <div className='devolucao'>
          <div className='bloco'>
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
            <div className='bloco'>
            <label>Data e Horário de Devolução:</label>
              <div className='Data-hora'>
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
      </div>
    )
}

export default BuscaAluguel;