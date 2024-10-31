import { useState, useEffect } from 'react';
import { fetchLembretes, addLembrete as addLembreteAPI, markLembreteAsOk } from '../../../services/api';
import './index.css';
import imagemFuncionario from '../../../assets/PrincipalFuncionarios.jpg';

const LembretesPage = () => {
  const [lembretes, setLembretes] = useState([]);
  const [filteredLembretes, setFilteredLembretes] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('Geral');
  const [dataExpiracao, setDataExpiracao] = useState('');
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedLembrete, setSelectedLembrete] = useState(null);

  const [filterCategoria, setFilterCategoria] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterTitulo, setFilterTitulo] = useState('');

  useEffect(() => {
    const loadLembretes = async () => {
      try {
        const response = await fetchLembretes();
        setLembretes(response.data);
        setFilteredLembretes(response.data);
      } catch (error) {
        setError('Erro ao carregar lembretes.');
      }
    };
    loadLembretes();
  }, []);

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

  useEffect(() => {
    applyFilters();
  }, [filterCategoria, filterStatus, filterTitulo, lembretes]);

  // Função para abrir o modal
  const handleLembreteClick = (lembrete) => {
    setSelectedLembrete(lembrete);
    setShowModal(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedLembrete(null);
  };

  // Função para adicionar um novo lembrete
  const handleAddLembrete = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    try {
      const newLembrete = {
        titulo,
        descricao,
        categoria,
        data_expiracao: dataExpiracao,
      };
      const response = await addLembreteAPI(newLembrete); // Chama a API para adicionar
      setLembretes([...lembretes, response.data]); // Adiciona o novo lembrete ao estado
      setTitulo(''); // Limpa os campos do formulário
      setDescricao('');
      setCategoria('Geral');
      setDataExpiracao('');
    } catch (error) {
      setError('Erro ao adicionar lembrete.');
    }
  };

  // Função para marcar o lembrete como OK
  const handleMarkAsOk = async (id) => {
    try {
      await markLembreteAsOk(id);
      const updatedLembretes = lembretes.map(lembrete =>
        lembrete.id === id ? { ...lembrete, status_ok: true } : lembrete
      );
      setLembretes(updatedLembretes);
    } catch (error) {
      setError('Erro ao marcar lembrete como OK.');
    }
  };

  return (
    <div className="lembretes-page">
      <div className="banner-container">
        <img src={imagemFuncionario} alt="Banner da Empresa" className="banner-image" />
        <div className="banner-text">
          <h1>Qualidade e Confiabilidade em Aluguel e Venda de Carros</h1>
        </div>
      </div>

      <h1 className="lembretes-title">Lembretes da Empresa</h1>

      <div className="filter-container">
        <input
          className="input-filtro-lembrete"
          type="text"
          placeholder="Buscar por título"
          value={filterTitulo}
          onChange={(e) => setFilterTitulo(e.target.value)}
        />
        <select className="input-filtro-lembrete" value={filterCategoria} onChange={(e) => setFilterCategoria(e.target.value)}>
          <option value="">Todas as Categorias</option>
          <option value="Geral">Geral</option>
          <option value="Reunião">Reunião</option>
          <option value="Urgente">Urgente</option>
          <option value="Notícia">Notícia</option>
        </select>
        <select className="input-filtro-lembrete" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">Todos os Status</option>
          <option value="OK">OK</option>
          <option value="Pendente">Pendente</option>
        </select>
      </div>

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
                <tr key={lembrete.id} onClick={() => handleLembreteClick(lembrete)} style={{ cursor: 'pointer' }}>
                  <td>{lembrete.titulo}</td>
                  <td>{lembrete.categoria}</td>
                  <td>{new Date(lembrete.data_criacao).toLocaleDateString()}</td>
                  <td>{new Date(lembrete.data_expiracao).toLocaleDateString()}</td>
                  <td>{lembrete.status_ok ? 'OK' : 'Pendente'}</td>
                  <td>
                    {!lembrete.status_ok && (
                      <button onClick={(e) => { e.stopPropagation(); handleMarkAsOk(lembrete.id); }}>
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
          <form onSubmit={handleAddLembrete}>
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

      {showModal && selectedLembrete && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedLembrete.titulo}</h2>
            <p><strong>Descrição:</strong> {selectedLembrete.descricao}</p>
            <p><strong>Categoria:</strong> {selectedLembrete.categoria}</p>
            <p><strong>Data de Criação:</strong> {new Date(selectedLembrete.data_criacao).toLocaleDateString()}</p>
            <p><strong>Data de Expiração:</strong> {new Date(selectedLembrete.data_expiracao).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {selectedLembrete.status_ok ? 'OK' : 'Pendente'}</p>
            <button onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LembretesPage;
