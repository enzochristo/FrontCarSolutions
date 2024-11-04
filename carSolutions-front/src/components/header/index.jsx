import carsolutionslogo from '../../assets/carsolutionslogo.png';
import userIconImage from '../../assets/user-icon.png';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import { logoutUser, getUserData } from '../../services/api';

function Header({ scrollToFooter }) {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isFleetDropdownOpen, setIsFleetDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Novo estado para o menu lateral
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        const userData = await getUserData();
        setUser(userData);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      setUser(null);
    }
  };

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

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setIsSidebarOpen(!isSidebarOpen); // Abre e fecha a aba lateral

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('access_token');
      if (token && !user) {
        fetchUserData();
      } else if (!token && user) {
        setUser(null);
      }
    };
    const intervalId = setInterval(checkAuth, 1000);
    return () => clearInterval(intervalId);
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setIsFleetDropdownOpen(false);
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
        <p className='nome-header'>Car Solutions</p>
      </div>

      <nav className="nav-header">
        {user?.isfuncionario ? (
          <Link to="/funcionario/ProdutosCadastrados" className="nav-link">Frota</Link>
        ) : (
          <Link to="/cliente/Produtos" className="nav-link">Produtos</Link>
        )}
        <Link to="/sobrenosgeral" className="nav-link">Sobre Nós</Link>
        <button className="nav-link falaconosco" onClick={scrollToFooter}>Fale Conosco</button>
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
                {user?.isfuncionario ? null : (
                  <Link to="/cliente/MinhasReservas" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Minhas Reservas</Link>
                )}
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

      <button className="hamburger-icon" onClick={toggleMobileMenu}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Sidebar para menu móvel */}
      {isSidebarOpen && (
        <div className="sidebar">
          <div className="sidebar-header">
            <p>Olá, {user ? user.full_name.split(" ")[0] : "Visitante"}</p>
            <button className="close-sidebar" onClick={toggleMobileMenu}>&times;</button>
          </div>
          <div className="sidebar-links">
            {user?.isfuncionario ? (
              <>
                <Link to="/funcionario/ProdutosCadastrados" onClick={toggleMobileMenu}>Produtos Cadastrados</Link>
                <Link to="/funcionario/TodasReservas" onClick={toggleMobileMenu}>Todas as Reservas</Link>
              </>
            ) : (
              <>
                <Link to="/cliente/MeusDadosCliente" onClick={toggleMobileMenu}>Meus Dados</Link>
                <Link to="/cliente/MinhasReservas" onClick={toggleMobileMenu}>Minhas Reservas</Link>
              </>
            )}
            {user && <button onClick={handleLogout}>Logout</button>}
            {!user && (
              <>
                <Link to="/LoginPageCliente" onClick={toggleMobileMenu}>Login</Link>
                <Link to="/CadastroCliente" onClick={toggleMobileMenu}>Cadastro</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
