// src/components/CarFilters/CarFilters.jsx
import React, { useState } from 'react';
import './index.css';

const CarFilters = ({ onFilter }) => {
  // Estados para os filtros
  const [marcaSelecionada, setMarcaSelecionada] = useState([]);
  const [tipoProduto, setTipoProduto] = useState('');
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);
  const [aplicarFiltroAluguel, setAplicarFiltroAluguel] = useState(false);
  const [aplicarFiltroVenda, setAplicarFiltroVenda] = useState(false);
  const [precoMinAluguel, setPrecoMinAluguel] = useState(0);
  const [precoMaxAluguel, setPrecoMaxAluguel] = useState(1000);
  const [precoMinVenda, setPrecoMinVenda] = useState(5000);
  const [precoMaxVenda, setPrecoMaxVenda] = useState(1000000);

  // Marcas disponíveis - isso pode ser substituído por uma lista dinâmica do backend
  const marcasDisponiveis = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Hyundai'];

  // Função para lidar com checkboxes de marca
  const handleMarcaChange = (marca) => {
    if (marcaSelecionada.includes(marca)) {
      setMarcaSelecionada(marcaSelecionada.filter(item => item !== marca));
    } else {
      setMarcaSelecionada([...marcaSelecionada, marca]);
    }
  };

  // Função para lidar com radio button de tipo de produto
  const handleTipoProdutoChange = (tipo) => {
    setTipoProduto(tipo);
  };

  // Função para lidar com checkboxes de categoria
  const handleCategoriaChange = (categoria) => {
    if (categoriasSelecionadas.includes(categoria)) {
      setCategoriasSelecionadas(categoriasSelecionadas.filter(item => item !== categoria));
    } else {
      setCategoriasSelecionadas([...categoriasSelecionadas, categoria]);
    }
  };

  // Função para aplicar os filtros selecionados
  const handleApplyFilters = () => {
    const filters = {
      marcas: marcaSelecionada,
      tipoProduto,
      categorias: categoriasSelecionadas,
    };

    // Inclui filtros de preço apenas se o checkbox estiver selecionado
    if (aplicarFiltroAluguel) {
      filters.precoMinAluguel = precoMinAluguel;
      filters.precoMaxAluguel = precoMaxAluguel;
    }
    if (aplicarFiltroVenda) {
      filters.precoMinVenda = precoMinVenda;
      filters.precoMaxVenda = precoMaxVenda;
    }

    onFilter(filters); // Envia os filtros para o componente pai
  };
  const handleClearFilters = () => {
    setMarcaSelecionada([]);
    setTipoProduto('');
    setCategoriasSelecionadas([]);
    setAplicarFiltroAluguel(false);
    setAplicarFiltroVenda(false);
    setPrecoMinAluguel(0);
    setPrecoMaxAluguel(1000);
    setPrecoMinVenda(5000);
    setPrecoMaxVenda(1000000);
    onFilter({}); // Envia um objeto vazio para remover todos os filtros aplicados
  };

  return (
    <div className="filter-panel">
      <h3>Filtros de Carros</h3>

      {/* Filtro de Marcas */}
      <div className="filter-section">
        <h4>Marcas Disponíveis</h4>
        {marcasDisponiveis.map((marca) => (
          <label key={marca}>
            <input
              type="checkbox"
              value={marca}
              onChange={() => handleMarcaChange(marca)}
              checked={marcaSelecionada.includes(marca)}
            />
            {marca}
          </label>
        ))}
      </div>

      {/* Filtro de Tipo de Produto com Radio Buttons */}
      <div className="filter-section">
        <h4>Produto:</h4>
        {['Aluguel', 'Venda', 'Aluguel e Venda'].map((tipo) => (
          <label key={tipo} className='custom-radio'>
            <input
              type="radio"
              name="tipoProduto"
              value={tipo}
              onChange={() => handleTipoProdutoChange(tipo)}
              checked={tipoProduto === tipo}
            />
            <span className="checkmark"></span>
            {tipo}
          </label>
        ))}
      </div>

      {/* Filtro de Categorias */}
      <div className="filter-section">
        <h4>Categoria:</h4>
        {['SUV', 'Sedan', 'Caminhonetes', 'Outros'].map((categoria) => (
          <label key={categoria}>
            <input
              type="checkbox"
              value={categoria}
              onChange={() => handleCategoriaChange(categoria)}
              checked={categoriasSelecionadas.includes(categoria)}
            />
            {categoria}
          </label>
        ))}
      </div>

      {/* Filtro de Preço de Aluguel */}
      <div className="filter-section">
        <h4>Preço Diária (Aluguel)</h4>
        <label>
          <input
            type="checkbox"
            checked={aplicarFiltroAluguel}
            onChange={(e) => setAplicarFiltroAluguel(e.target.checked)}
          />
          Aplicar Filtro
        </label>
        <label>Min: R$ {precoMinAluguel}</label>
        <input
          type="range"
          min="0"
          max="2000"
          step="50"
          value={precoMinAluguel}
          onChange={(e) => setPrecoMinAluguel(Number(e.target.value))}
          disabled={!aplicarFiltroAluguel}
        />
        <label>Max: R$ {precoMaxAluguel}</label>
        <input
          type="range"
          min="0"
          max="2000"
          step="50"
          value={precoMaxAluguel}
          onChange={(e) => setPrecoMaxAluguel(Number(e.target.value))}
          disabled={!aplicarFiltroAluguel}
        />
      </div>

      {/* Filtro de Preço de Venda */}
      <div className="filter-section">
        <h4>Preço de Venda</h4>
        <label>
          <input
            type="checkbox"
            checked={aplicarFiltroVenda}
            onChange={(e) => setAplicarFiltroVenda(e.target.checked)}
          />
          Aplicar Filtro
        </label>
        <label>Min: R$ {precoMinVenda}</label>
        <input
          type="range"
          min="5000"
          max="1000000"
          step="1000"
          value={precoMinVenda}
          onChange={(e) => setPrecoMinVenda(Number(e.target.value))}
          disabled={!aplicarFiltroVenda}
        />
        <label>Max: R$ {precoMaxVenda}</label>
        <input
          type="range"
          min="5000"
          max="1000000"
          step="1000"
          value={precoMaxVenda}
          onChange={(e) => setPrecoMaxVenda(Number(e.target.value))}
          disabled={!aplicarFiltroVenda}
        />
      </div>

      <div className="buttons-container">
        <button className="apply-button-filtro" onClick={handleApplyFilters}>Aplicar Filtros</button>
        <button className="clear-button" onClick={handleClearFilters}>Limpar Filtros</button>
      </div>
    </div>
  );
};

export default CarFilters;
