// src/Pages/ExposicaoCarrosPage/index.jsx

import { useState, useEffect } from 'react';
import CarFilters from '../../../components/CarFilters';
import CarCard from '../../../components/CardCarro';
import BuscaAluguel from '../../../components/BuscaAluguel';

import './index.css';
import { getAvailableCars } from '../../../services/api';
// src/Pages/ProdutosPage/index.jsx


const ProdutosPage = () => {
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

  return (
    <div className="produtos-page">
      {/* Retângulo de Destaque */}
      <BuscaAluguel />
      <div className="content-produtos">
        {/* Filtro Lateral */}
        <div className='filtro-produtos'>
        <CarFilters  filters={filters} onFilterChange={handleFilterChange} />
        </div>
        {/* Exibição dos Carros em Formato de Card */}
        <div className="carros-disponiveis">
          {Array.isArray(cars) && cars.length > 0 ? (
            cars.map((car) => <CarCard key={car.id} car={car} />)
          ) : (
            <p>Nenhum carro disponível.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProdutosPage;
