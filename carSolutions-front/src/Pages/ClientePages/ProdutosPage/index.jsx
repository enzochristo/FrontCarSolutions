// src/Pages/ProdutosPage/ProdutosPage.jsx
import { useState, useEffect } from 'react';
import BuscaAluguel from '../../../components/BuscaAluguel';
import CarCard from '../../../components/CardCarro';
import CarFilters from '../../../components/FiltroLateral';
import { getAvailableCars, getAvailableCarsByDate } from '../../../services/api';
import './index.css';

const ProdutosPage = () => {
  const [carros, setCarros] = useState([]); // Todos os carros disponíveis, inicializado com a lista completa
  const [filteredCarros, setFilteredCarros] = useState([]); // Carros filtrados para exibição
  const [loading, setLoading] = useState(true);
  const [isPeriodFiltered, setIsPeriodFiltered] = useState(false); // Estado para controlar o filtro de período

  // Carrega todos os carros disponíveis ao montar o componente
  useEffect(() => {
    loadAvailableCars();
  }, []);

  // Função para carregar todos os carros disponíveis ou carros filtrados por disponibilidade de período
  const loadAvailableCars = async (filters = {}) => {
    try {
      setLoading(true);
      const data = await getAvailableCars(filters); // Carrega carros disponíveis, possivelmente com filtros
      setCarros(data);
      setFilteredCarros(data); // Inicializa a lista de exibição com todos os carros disponíveis
      setIsPeriodFiltered(false); // Reseta o filtro de período ao carregar todos os carros
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar carros disponíveis:", error);
      setLoading(false);
    }
  };

  // Recebe a lista de carros disponíveis para o período especificado pelo BuscaAluguel
  const handleAvailableCars = async (periodFilters) => {
    try {
      setLoading(true);
      const availableCars = await getAvailableCarsByDate(periodFilters); // Busca carros disponíveis no período especificado
      setCarros(availableCars);
      setFilteredCarros(availableCars); // Atualiza a lista de exibição com carros disponíveis no período
      setIsPeriodFiltered(true); // Marca que o filtro de período está ativo
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar carros disponíveis no período:", error);
      setLoading(false);
    }
  };
  // Função para limpar o filtro de período e restaurar todos os carros disponíveis
  const handleClearPeriodFilter = () => {
    loadAvailableCars(); // Restaura a lista com todos os carros disponíveis
  };

  // Aplica os filtros da lateral sobre a lista atual de carros disponíveis
  const handleFilter = (filters) => {
    const filtered = carros.filter((car) => {
      return (
        (!filters.marca || car.marca === filters.marca) &&
        (!filters.tipoProduto || car.tipo_de_produto === filters.tipoProduto) &&
        (!filters.categorias.length || filters.categorias.includes(car.categoria)) &&
        (!filters.precoMinAluguel || car.preco_diaria >= filters.precoMinAluguel) &&
        (!filters.precoMaxAluguel || car.preco_diaria <= filters.precoMaxAluguel) &&
        (!filters.precoMinVenda || car.preco_venda >= filters.precoMinVenda) &&
        (!filters.precoMaxVenda || car.preco_venda <= filters.precoMaxVenda)
      );
    });
    setFilteredCarros(filtered); // Atualiza a lista de exibição com os carros filtrados
  };

  return (
    <div className="produtos-page">
      {/* Componente para busca de disponibilidade por período */}
      <BuscaAluguel onAvailableCars={handleAvailableCars} />
      {/* Botão para limpar o filtro de período, visível apenas se o filtro de período estiver ativo */}
      {isPeriodFiltered && (
        <button onClick={handleClearPeriodFilter} className="clear-period-filter-button">
          Limpar Filtro de Período
        </button>
      )}

      <div className="filter-and-cards">
        {/* Filtros da lateral */}
        <CarFilters onFilter={handleFilter} />

        <div className="carros-disponiveis">
          {loading ? (
            <p>Carregando carros disponíveis...</p>
          ) : filteredCarros.length > 0 ? (
            filteredCarros.map(carro => (
              <CarCard key={carro.id} car={carro} />
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
