// src/Pages/ProdutosPage/ProdutosPage.jsx
import React, { useState, useEffect } from 'react';
import { getAvailableCars } from '../../../services/api';
import CardCarro from '../../../components/CardCarro';
import CarFilters from '../../../components/FiltroLateral';
import './index.css';

const ProdutosPage = () => {
  const [carros, setCarros] = useState([]);
  const [filteredCarros, setFilteredCarros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAvailableCars(); // Carrega carros disponíveis ao montar o componente
  }, []);

  const loadAvailableCars = async (filters = {}) => {
    try {
      setLoading(true);
      const data = await getAvailableCars(filters); // Passa filtros para a requisição
      setCarros(data);
      setFilteredCarros(data);
      console.log("Dados recebidos do backend:", data); // Verifica os dados recebidos do backend
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar carros disponíveis:", error);
      setLoading(false);
    }
  };

  const handleFilter = (filters) => {
    // Converte filtros em um formato adequado para a consulta ao backend
    const queryFilters = {};

    if (filters.marca) queryFilters.marca = filters.marca;
    if (filters.tiposProduto && filters.tiposProduto.length > 0) {
      queryFilters.tipoProduto = filters.tiposProduto;
    }
    if (filters.categorias && filters.categorias.length > 0) {
      queryFilters.categorias = filters.categorias;
    }
    if (filters.precoMinAluguel) queryFilters.precoMinAluguel = filters.precoMinAluguel;
    if (filters.precoMaxAluguel) queryFilters.precoMaxAluguel = filters.precoMaxAluguel;
    if (filters.precoMinVenda) queryFilters.precoMinVenda = filters.precoMinVenda;
    if (filters.precoMaxVenda) queryFilters.precoMaxVenda = filters.precoMaxVenda;

    console.log("Filtros aplicados:", queryFilters); // Verifica os filtros aplicados

    // Chama a função para carregar os carros filtrados
    loadAvailableCars(queryFilters);
      }; 


  return (
    <div className="produtos-page">
      <div className="filter-and-cards">
        <CarFilters onFilter={handleFilter} />
        <div className="carros-disponiveis">
          {loading ? (
            <p>Carregando carros disponíveis...</p>
          ) : filteredCarros.length > 0 ? (
            filteredCarros.map(carro => (
              <CardCarro key={carro.id} car={carro} />
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
