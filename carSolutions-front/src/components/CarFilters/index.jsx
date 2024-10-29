// src/components/CarFilters/index.jsx

import React, { useState } from 'react';
import './index.css';

const CarFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    marcas: [],
    categorias: [],
    precoMin: '',
    precoMax: '',
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
      [name]: value,
    }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <div className="filter-panel">
      <h3>Filtros:</h3>
      <div className="filter-section">
        <h4>Marcas:</h4>
        {['Toyota', 'Chevrolet', 'Honda', 'Volkswagen', 'Nissan', 'Ford'].map((marca) => (
          <label key={marca}>
            <input
              type="checkbox"
              value={marca}
              onChange={(e) => handleCheckboxChange(e, 'marcas')}
            />
            {marca}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Categoria:</h4>
        {['Sedan', 'SUV', 'Caminhonetes', 'Outros'].map((categoria) => (
          <label key={categoria}>
            <input
              type="checkbox"
              value={categoria}
              onChange={(e) => handleCheckboxChange(e, 'categorias')}
            />
            {categoria}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Faixa de Preço:</h4>
        <label>
          Mínimo: R$
          <input
            type="range"
            name="precoMin"
            value={filters.precoMin}
            onChange={handlePriceChange}
          />
        </label>
        <label>
          Máximo: R$
          <input
            type="range"
            name="precoMax"
            value={filters.precoMax}
            onChange={handlePriceChange}
          />
        </label>
      </div>

      <div className="filter-section">
        <h4>Produto:</h4>
        {['Aluguel', 'Venda', 'Aluguel e Venda'].map((tipo) => (
          <label key={tipo}>
            <input
              type="checkbox"
              value={tipo}
              onChange={(e) => handleCheckboxChange(e, 'tipoProduto')}
            />
            {tipo}
          </label>
        ))}
      </div>

      <button className="apply-button" onClick={applyFilters}>
        Aplicar Filtros
      </button>
    </div>
  );
};

export default CarFilters;
