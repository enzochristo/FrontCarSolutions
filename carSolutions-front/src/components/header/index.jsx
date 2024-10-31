import carsolutionslogo from '../../assets/carsolutionslogo.png'; // Caminho atualizado da logo
import userIconImage from '../../assets/user-icon.png'; // Caminho atualizado do ícone do usuário
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Use 'useNavigate' em vez de 'useHistory'
import './index.css';
import { logoutUser, getUserData } from '../../services/api';

// src/Components/Header/index.jsx

function Header({ scrollToFooter }) {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Função para buscar dados do usuário
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {  // Verifica se o token existe antes de chamar getUserData
        const userData = await getUserData();
        setUser(userData);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      setUser(null);
    }
  };


  // Função para logout
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      await logoutUser(refreshToken);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      navigate('/');
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Verificação periódica do `access_token` no localStorage
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('access_token');
      if (token && !user) {
        fetchUserData(); // Carrega os dados do usuário se o token estiver presente
      } else if (!token && user) {
        setUser(null); // Remove o usuário se o token não estiver presente
      }
    };

    const intervalId = setInterval(checkAuth, 1000); // Verifica a cada segundo
    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
  }, [user]);

  // Fechar o dropdown ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo-container">
        <Link to='/'>
        <img src={carsolutionslogo} alt="Logo da Empresa" className="logo" />
        </Link>
      </div>
      
      <div className="resto">
        <nav className="nav-header">
          {user?.isfuncionario ? (
            <Link to="/funcionario/ProdutosCadastrados" className="nav-link">Estoque</Link>
            ) : (
            <Link to="/cliente/Produtos" className="nav-link">Produtos</Link>
            )}          
          <Link to="/sobrenosgeral" className="nav-link">Sobre Nós</Link>
          <button className="nav-link falaconosco" onClick={scrollToFooter}>Fale Conosco</button> {/* Chama a função */}
        </nav>

        <div className="user-menu" ref={dropdownRef}>
          {user ? (
            <>
              <button className="user-icon" onClick={toggleDropdown}>
                Olá, {user.full_name.split(" ")[0]}
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/cliente/MeusDadosCliente" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Meus Dados</Link>
                  <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </>
          ) : (
            <>
              <button className="user-icon" onClick={toggleDropdown}>
                <img src={userIconImage} alt="Ícone de Usuário" className="user-icon-img" />
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/LoginPageCliente" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Login</Link>
                  <Link to="/CadastroCliente" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Cadastro</Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
