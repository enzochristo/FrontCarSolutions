import { useEffect, useState } from 'react';
import TabelaCarros from '../../../components/TabelaCarros';
import DetalhesDoCarro from '../../../components/DetalhesDoCarro';
import CarFilters from '../../../components/CarFilters';
import { fetchCars, deleteCar } from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import plus from '../../../assets/plus.png';
import './index.css';

const ProdutosCadastradosPage = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCars = async () => {
      try {
        const response = await fetchCars();
        setCars(response.data);
        setFilteredCars(response.data);
      } catch (error) {
        console.error("Erro ao carregar carros:", error);
      }
    };

    loadCars();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const searchResults = cars.filter((car) =>
      car.id.toString().includes(event.target.value)
    );
    setFilteredCars(searchResults);
  };

  const handleDelete = async (carId) => {
    if (window.confirm("Tem certeza de que deseja excluir este carro?")) {
      await deleteCar(carId);
      setCars(cars.filter((car) => car.id !== carId));
      setFilteredCars(filteredCars.filter((car) => car.id !== carId));
    }
  };

  const openModal = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedCar(null);
    setShowModal(false);
  };

  const handleFilterChange = (filters) => {
    // Filtragem lógica aqui. Esta lógica deve ser implementada para aplicar os filtros nos dados de `cars`.
    const { marcas, categorias, precoMin, precoMax, tipoProduto } = filters;
    const filtered = cars.filter((car) => {
      const matchMarca = !marcas.length || marcas.includes(car.marca);
      const matchCategoria = !categorias.length || categorias.includes(car.categoria);
      const matchPreco = (!precoMin || car.preco >= precoMin) && (!precoMax || car.preco <= precoMax);
      const matchTipo = !tipoProduto.length || tipoProduto.includes(car.tipo_de_produto);
      return matchMarca && matchCategoria && matchPreco && matchTipo;
    });
    setFilteredCars(filtered);
  };

  return (
    <div className="produtos-cadastrados-page">
      <header className='em-cima'>
        <h1>Carros Cadastrados</h1>
        <input
          type="text"
          placeholder="ID do carro"
          className='search-input'
          value={searchTerm}
          onChange={handleSearch}
        />
      </header>
      <div className="content">
        <CarFilters className='filtro' onFilterChange={handleFilterChange} />
        <TabelaCarros className='tabela' cars={filteredCars} onView={openModal} onDelete={handleDelete} />
      </div>
      {showModal && (
        <DetalhesDoCarro car={selectedCar} onClose={closeModal} />
      )}
      <div className='em-baixo'>
      <button
        className="floating-add-button"
        onClick={() => navigate('/funcionario/cadastroVeiculo')}
      >
        <img className='icone' src={plus} alt="Adicionar" />
      </button>
      </div>
    </div>
  );
};

export default ProdutosCadastradosPage;
