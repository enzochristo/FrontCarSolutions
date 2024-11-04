import carsolutionslogo from '../../assets/carsolutionslogo.png';
import userIconImage from '../../assets/user-icon.png';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import { logoutUser, getUserData } from '../../services/api';

function Header({ scrollToFooter }) {
  const [user, setUser] = useState(null);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  // Função para buscar dados do usuário
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

  const toggleMenuDropdown = () => setMenuDropdownOpen(!menuDropdownOpen);
  const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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

  // Fechar os dropdowns ao clicar fora deles
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuDropdownRef.current && !menuDropdownRef.current.contains(event.target)) {
        setMenuDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
        <div className="nav-link" onClick={toggleMenuDropdown}>
          Menu
          {menuDropdownOpen && (
            <div className="dropdown-menu" ref={menuDropdownRef}>
              {user ? (
                user.isfuncionario ? (
                  <>
                    <Link to="/funcionario/ProdutosCadastrados" className="dropdown-item" onClick={() => setMenuDropdownOpen(false)}>Estoque</Link>
                    <Link to="/funcionario/TodasReservas" className="dropdown-item" onClick={() => setMenuDropdownOpen(false)}>Histórico de Reservas</Link>
                    <Link to="/funcionario/PrincipalFuncionario" className="dropdown-item" onClick={() => setMenuDropdownOpen(false)}>Lembretes</Link>
                  </>
                ) : (
                  <>
                    <Link to="/" className="dropdown-item" onClick={() => setMenuDropdownOpen(false)}>Página Inicial</Link>
                    <Link to="/cliente/Produtos" className="dropdown-item" onClick={() => setMenuDropdownOpen(false)}>Produtos</Link>
                    <Link to="/cliente/MinhasReservas" className="dropdown-item" onClick={() => setMenuDropdownOpen(false)}>Minhas Reservas</Link>
                  </>
                )
              ) : (
                <>
                  <Link to="/LoginPageCliente" className="dropdown-item" onClick={() => setMenuDropdownOpen(false)}>Página Inicial</Link>
                  <Link to="/LoginPageCliente" className="dropdown-item" onClick={() => setMenuDropdownOpen(false)}>Produtos</Link>
                  <Link to="/LoginPageCliente" className="dropdown-item" onClick={() => setMenuDropdownOpen(false)}>Estoque</Link>
                </>
              )}
            </div>
          )}
        </div>

        <Link to="/sobrenosgeral" className="nav-link">Sobre Nós</Link>
        <button className="nav-link falaconosco" onClick={scrollToFooter}>Fale Conosco</button>
      </nav>

      <div className="user-menu" ref={userDropdownRef}>
        {user ? (
          <>
            <button className="user-icon" onClick={toggleUserDropdown}>
              Olá, {user.full_name.split(" ")[0]}
            </button>
            {userDropdownOpen && (
              <div className="dropdown-menu drop-cliente">
                <Link to="/cliente/MeusDadosCliente" className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>Meus Dados</Link>
                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </>
        ) : (
          <>
            <button className="user-icon" onClick={toggleUserDropdown}>
              <img src={userIconImage} alt="Ícone de Usuário" className="user-icon-img" />
            </button>
            {userDropdownOpen && (
              <div className="dropdown-menu drop-cliente">
                <Link to="/LoginPageCliente" className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>Login</Link>
                <Link to="/CadastroCliente" className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>Cadastro</Link>
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

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <button className="close-btn" onClick={toggleMobileMenu}>X</button>
          <p className="mobile-user-greeting">Olá, {user ? user.full_name.split(" ")[0] : 'Visitante'}</p>
          <Link to="/" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Página Inicial</Link>
          <Link to="/sobrenosgeral" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Sobre Nós</Link>
          <button className="mobile-link" onClick={() => { scrollToFooter(); setIsMobileMenuOpen(false); }}>Fale Conosco</button>
          {user ? (
            <>
              {user.isfuncionario ? (
                <>
                  <Link to="/funcionario/ProdutosCadastrados" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Estoque</Link>
                  <Link to="/funcionario/TodasReservas" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Histórico de Reservas</Link>
                  <Link to="/funcionario/PrincipalFuncionario" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Lembretes</Link>
                </>
              ) : (
                <>
                  <Link to="/cliente/Produtos" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Produtos</Link>
                  <Link to="/cliente/MinhasReservas" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Minhas Reservas</Link>
                </>
              )}
              <Link to="/cliente/MeusDadosCliente" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Meus Dados</Link>
              <button className="mobile-link" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/LoginPageCliente" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
              <Link to="/CadastroCliente" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Cadastro</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
