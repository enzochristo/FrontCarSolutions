// src/pages/LembretesPage.jsx
import { useState, useEffect } from 'react';
import { fetchLembretes, addLembrete, markLembreteAsOk } from '../../../services/api';
import './index.css';
import imagemFuncionario from '../../../assets/PrincipalFuncionarios.jpg';

const LembretesPage = () => {
  // Estados para lembretes e filtros
  const [lembretes, setLembretes] = useState([]);
  const [filteredLembretes, setFilteredLembretes] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('Geral');
  const [dataExpiracao, setDataExpiracao] = useState('');
  const [error, setError] = useState(null);

  // Estados para filtros
  const [filterCategoria, setFilterCategoria] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterTitulo, setFilterTitulo] = useState('');

  // Carrega os lembretes ao montar o componente
  useEffect(() => {
      const loadLembretes = async () => {
          try {
              const response = await fetchLembretes();
              setLembretes(response.data);
              setFilteredLembretes(response.data); // Inicializa o filtro com todos os lembretes
          } catch (error) {
              setError('Erro ao carregar lembretes.');
          }
      };
      loadLembretes();
  }, []);

  // Função para aplicar filtros
  const applyFilters = () => {
      let filtered = lembretes;

      if (filterCategoria) {
          filtered = filtered.filter(lembrete => lembrete.categoria === filterCategoria);
      }

      if (filterStatus) {
          const isStatusOk = filterStatus === 'OK';
          filtered = filtered.filter(lembrete => lembrete.status_ok === isStatusOk);
      }

      if (filterTitulo) {
          filtered = filtered.filter(lembrete =>
              lembrete.titulo.toLowerCase().includes(filterTitulo.toLowerCase())
          );
      }

      setFilteredLembretes(filtered);
  };

  // Atualiza a tabela quando os filtros mudam
  useEffect(() => {
      applyFilters();
  }, [filterCategoria, filterStatus, filterTitulo, lembretes]);

  return (
      <div className="lembretes-page">
          {/* Banner da Empresa */}
          <div className="banner-container">
              <img src={imagemFuncionario} alt="Banner da Empresa" className="banner-image" />
              <div className="banner-text">
                  <h1>Qualidade e Confiabilidade em Aluguel e Venda de Carros</h1>
              </div>
          </div>

          {/* Título da Seção de Lembretes */}
          <h1 className="lembretes-title">Lembretes da Empresa</h1>

          {/* Filtros */}
          <div className="filter-container">
              <input
              className='input-filtro-lembrete'
                  type="text"
                  placeholder="Buscar por título"
                  value={filterTitulo}
                  onChange={(e) => setFilterTitulo(e.target.value)}
              />
              <select className='input-filtro-lembrete' value={filterCategoria} onChange={(e) => setFilterCategoria(e.target.value)}>
                  <option value="">Todas as Categorias</option>
                  <option value="Geral">Geral</option>
                  <option value="Reunião">Reunião</option>
                  <option value="Urgente">Urgente</option>
                  <option value="Notícia">Notícia</option>
              </select>
              <select className='input-filtro-lembrete' value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="">Todos os Status</option>
                  <option value="OK">OK</option>
                  <option value="Pendente">Pendente</option>
              </select>
          </div>

          {/* Conteúdo Principal */}
          <div className="content">
              <div className="table-container">
                  <table className="lembretes-table">
                      <thead>
                          <tr>
                              <th>Título</th>
                              <th>Categoria</th>
                              <th>Data de Criação</th>
                              <th>Expira em</th>
                              <th>Status</th>
                              <th>Ações</th>
                          </tr>
                      </thead>
                      <tbody>
                          {filteredLembretes.map((lembrete) => (
                              <tr key={lembrete.id}>
                                  <td>{lembrete.titulo}</td>
                                  <td>{lembrete.categoria}</td>
                                  <td>{new Date(lembrete.data_criacao).toLocaleDateString()}</td>
                                  <td>{new Date(lembrete.data_expiracao).toLocaleDateString()}</td>
                                  <td>{lembrete.status_ok ? 'OK' : 'Pendente'}</td>
                                  <td>
                                      {!lembrete.status_ok && (
                                          <button onClick={() => markLembreteAsOk(lembrete.id)}>
                                              Marcar como OK
                                          </button>
                                      )}
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>

              <div className="form-container">
                  <form onSubmit={addLembrete}>
                      <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                      <textarea placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
                      <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                          <option value="Geral">Geral</option>
                          <option value="Reunião">Reunião</option>
                          <option value="Urgente">Urgente</option>
                          <option value="Notícia">Notícia</option>
                      </select>
                      <input type="date" value={dataExpiracao} onChange={(e) => setDataExpiracao(e.target.value)} required />
                      <button type="submit">Adicionar Lembrete</button>
                  </form>
              </div>
          </div>
      </div>
  );
};

export default LembretesPage;