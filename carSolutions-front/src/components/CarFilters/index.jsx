// src/components/CarFilters/index.jsx
import React, { useState } from 'react';
import './index.css';

const CarFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    marcas: [],
    categorias: [],
    precoMinAluguel: 0,
    precoMaxAluguel: 1000,
    precoMinVenda: 5000,
    precoMaxVenda: 1000000,
    tipoProduto: [],
  });

  const handleCheckboxChange = (event, category) => {
    const { value, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: checked
        ? [...prevFilters[category], value]
        : prevFilters[category].filter((item) => item !== value),
    }));
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: parseFloat(value),
    }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  const clearFilters = () => {
    setFilters({
      marcas: [],
      categorias: [],
      precoMinAluguel: 0,
      precoMaxAluguel: 1000,
      precoMinVenda: 5000,
      precoMaxVenda: 1000000,
      tipoProduto: [],
    });
    onFilterChange({}); // Reseta os filtros aplicados na página pai
  };

  return (
    <div className="filter-panel">
      <h3>Filtros:</h3>
      
      {/* Filtro de Marcas */}
      <div className="filter-section">
        <h4>Marcas:</h4>
        {['Toyota', 'Chevrolet', 'Honda', 'Volkswagen', 'Nissan', 'Ford'].map((marca) => (
          <label key={marca}>
            <input
              type="checkbox"
              value={marca}
              onChange={(e) => handleCheckboxChange(e, 'marcas')}
              checked={filters.marcas.includes(marca)}
            />
            {marca}
          </label>
        ))}
      </div>

      {/* Filtro de Categorias */}
      <div className="filter-section">
        <h4>Categoria:</h4>
        {['Sedan', 'SUV', 'Caminhonetes', 'Outros'].map((categoria) => (
          <label key={categoria}>
            <input
              type="checkbox"
              value={categoria}
              onChange={(e) => handleCheckboxChange(e, 'categorias')}
              checked={filters.categorias.includes(categoria)}
            />
            {categoria}
          </label>
        ))}
      </div>

      {/* Filtro de Preço Diária de Aluguel */}
      <div className="filter-section">
        <h4>Preço Diária (Aluguel):</h4>
        <label>Min: R$ {filters.precoMinAluguel}</label>
        <input
          type="range"
          name="precoMinAluguel"
          min="0"
          max="2000"
          step="50"
          value={filters.precoMinAluguel}
          onChange={handlePriceChange}
        />
        <label>Max: R$ {filters.precoMaxAluguel}</label>
        <input
          type="range"
          name="precoMaxAluguel"
          min="0"
          max="2000"
          step="50"
          value={filters.precoMaxAluguel}
          onChange={handlePriceChange}
        />
      </div>

      {/* Filtro de Preço de Venda */}
      <div className="filter-section">
        <h4>Preço de Venda:</h4>
        <label>Min: R$ {filters.precoMinVenda}</label>
        <input
          type="range"
          name="precoMinVenda"
          min="5000"
          max="1000000"
          step="1000"
          value={filters.precoMinVenda}
          onChange={handlePriceChange}
        />
        <label>Max: R$ {filters.precoMaxVenda}</label>
        <input
          type="range"
          name="precoMaxVenda"
          min="5000"
          max="1000000"
          step="1000"
          value={filters.precoMaxVenda}
          onChange={handlePriceChange}
        />
      </div>

      {/* Filtro de Tipo de Produto */}
      <div className="filter-section">
        <h4>Produto:</h4>
        {['Aluguel', 'Venda', 'Aluguel e Venda'].map((tipo) => (
          <label key={tipo}>
            <input
              type="checkbox"
              value={tipo}
              onChange={(e) => handleCheckboxChange(e, 'tipoProduto')}
              checked={filters.tipoProduto.includes(tipo)}
            />
            {tipo}
          </label>
        ))}
      </div>

      <button className="apply-button" onClick={applyFilters}>
        Aplicar Filtros
      </button>
      <button className="clear-button" onClick={clearFilters}>
        Limpar Filtros
      </button>
    </div>
  );
};

export default CarFilters;
