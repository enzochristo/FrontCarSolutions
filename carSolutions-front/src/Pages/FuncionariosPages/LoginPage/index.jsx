import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../../../services/api';
import './index.css';

const LoginPageFuncionario = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obter a URL atual
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleTabClick = (tab) => {
    if (tab === "cliente") {
      navigate('/cliente/login');
    } else if (tab === "colaborador") {
      navigate('/funcionario/login');
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/home');
    } catch (err) {
      setError('Login falhou. Verifique suas credenciais.');
    }
  };

  return (
    <div className="form-container">
      <div className="tab-buttons">
        <button
          className={`tab-button ${location.pathname === '/cliente/login' ? 'active' : ''}`}
          onClick={() => handleTabClick('cliente')}
        >
          Cliente
        </button>
        <button
          className={`tab-button ${location.pathname === '/funcionario/login' ? 'active' : ''}`}
          onClick={() => handleTabClick('colaborador')}
        >
          Colaborador
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="E-mail" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Senha" onChange={handleChange} required />
        <a href="/funcionario/cadastro" className="register-link">Cadastre-se</a>
        <button type="submit" className="login-button">Log In</button>
      </form>
    </div>
  );
};

export default LoginPageFuncionario;
