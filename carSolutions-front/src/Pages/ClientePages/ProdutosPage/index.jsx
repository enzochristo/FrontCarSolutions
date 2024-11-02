// src/Pages/ProdutosPage/ProdutosPage.jsx
import { useState, useEffect } from 'react';
import BuscaAluguel from '../../../components/BuscaAluguel';
import CarCard from '../../../components/CardCarro';
import CarFilters from '../../../components/FiltroLateral';
import { getAvailableCars, getAvailableCarsByDate } from '../../../services/api';
import './index.css';

const ProdutosPage = () => {
  const [carros, setCarros] = useState([]); // Todos os carros disponíveis
  const [filteredCarros, setFilteredCarros] = useState([]); // Carros exibidos após filtragem
  const [loading, setLoading] = useState(true);
  const [isPeriodFiltered, setIsPeriodFiltered] = useState(false); // Estado para saber se o filtro de período está ativo
  const [reservationDetails, setReservationDetails] = useState(null); // Novo estado para armazenar detalhes da reserva

  // Carrega todos os carros disponíveis ao montar o componente
  useEffect(() => {
    loadAvailableCars(); // Carrega todos os carros inicialmente
  }, []);

  // Função para carregar todos os carros disponíveis ou aplicar filtros
  const loadAvailableCars = async (filters = {}) => {
    try {
      setLoading(true);
      const data = await getAvailableCars(filters); // Carrega todos os carros disponíveis do backend
      setCarros(data);
      setFilteredCarros(data); // Exibe todos os carros inicialmente
      setIsPeriodFiltered(false); // Marca que o filtro de período não está ativo
      setReservationDetails(null); // Limpa os detalhes de reserva
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar carros disponíveis:", error);
      setLoading(false);
    }
  };

  // Função chamada pelo BuscaAluguel para definir os detalhes da reserva
  const handleAvailableCars = async (filters) => {
    try {
      setLoading(true);
      const availableCars = await getAvailableCarsByDate(filters); // Busca carros disponíveis no período
      setCarros(availableCars);
      setFilteredCarros(availableCars); // Atualiza a lista de exibição com carros disponíveis no período
      setIsPeriodFiltered(true); // Marca que o filtro de período está ativo
      setReservationDetails(filters); // Salva os detalhes de reserva fornecidos pelo usuário
  
      console.log("Reservation Details Set:", filters); // Adiciona este log para verificar se os dados estão corretos
  
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar carros disponíveis no período:", error);
      setLoading(false);
    }
  };
  

  // Função para limpar o filtro de período e restaurar todos os carros disponíveis
  const handleClearPeriodFilter = () => {
    loadAvailableCars(); // Restaura todos os carros
  };

  // Aplica filtros da lateral na lista de carros já filtrada pelo período
  const handleFilter = (filters) => {
    const filtered = carros.filter((car) => {
      return (
        (!filters.marcas.length || filters.marcas.includes(car.marca)) &&
        (!filters.tipoProduto || car.tipo_de_produto === filters.tipoProduto) &&
        (!filters.categorias.length || filters.categorias.includes(car.categoria)) &&
        (!filters.precoMinAluguel || car.preco_diaria >= filters.precoMinAluguel) &&
        (!filters.precoMaxAluguel || car.preco_diaria <= filters.precoMaxAluguel) &&
        (!filters.precoMinVenda || car.preco_venda >= filters.precoMinVenda) &&
        (!filters.precoMaxVenda || car.preco_venda <= filters.precoMaxVenda)
      );
    });
    setFilteredCarros(filtered);
  };

  return (
    <div className="produtos-page">
      {/* Componente de Busca por Aluguel com período */}
      <BuscaAluguel onAvailableCars={handleAvailableCars} />
      {/* Botão para limpar o filtro de período, visível apenas se o filtro de período estiver ativo */}
      {isPeriodFiltered && (
        <button onClick={handleClearPeriodFilter} className="clear-period-filter-button">
          Limpar Filtro de Período
        </button>
      )}

      <div className="filter-and-cards">
        {/* Filtros da lateral aplicados na lista de carros disponível */}
        <CarFilters onFilter={handleFilter} />

        <div className="carros-disponiveis">
          {loading ? (
            <p>Carregando carros disponíveis...</p>
          ) : filteredCarros.length > 0 ? (
            filteredCarros.map(carro => (
              <CarCard key={carro.id} car={carro} reservationDetails={reservationDetails} /> // Passa reservationDetails
            ))
          ) : (
            <p>Nenhum carro encontrado com os filtros selecionados.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProdutosPage;
