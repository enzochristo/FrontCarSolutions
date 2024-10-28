import { useEffect, useState } from 'react';
import TabelaCarros from '../../../components/TabelaCarros';
import DetalhesDoCarro from '../../../components/DetalhesDoCarro';
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

  return (
    <div className="produtos-cadastrados-page">
      <header>
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
        <TabelaCarros cars={filteredCars} onView={openModal} onDelete={handleDelete} />
      </div>
      {showModal && (
        <DetalhesDoCarro car={selectedCar} onClose={closeModal} />
      )}
      <button
        className="floating-add-button"
        onClick={() => navigate('/funcionario/cadastroVeiculo')}
      >
        <img className='icone' src={plus} alt="Adicionar" />
      </button>
    </div>
  );
};

export default ProdutosCadastradosPage;
