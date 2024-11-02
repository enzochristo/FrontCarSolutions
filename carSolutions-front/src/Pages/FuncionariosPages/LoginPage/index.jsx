import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../../../services/api';

import './index.css';

const LoginFuncionarioPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleTabClick = (tab) => {
    if (tab === "cliente") {
      navigate('/LoginPageCliente');
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
      navigate('/funcionario/PrincipalFuncionario');
    } catch (err) {
      setError('Login falhou. Verifique suas credenciais.');
    }
  };

  return (
    <div className="componente-login-fundo"> {/* Fundo com imagem */}
      <div className="componente-login-overlay"></div> {/* Overlay escuro */}
      <div className="form-container">
        <div className="tab-buttons">
          <button
            className='nao-ativo'
            onClick={() => handleTabClick('cliente')}
          >
            Cliente
          </button>
          <div className='ativo'>Colaborador</div>
        </div>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="E-mail" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Senha" onChange={handleChange} required />
          <a href="funcionarioCadastro" className="register-link">Cadastre-se</a>
          <button type="submit" className="login-button">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginFuncionarioPage;
