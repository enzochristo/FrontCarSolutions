import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/api';
import './index.css';

const LoginPageCliente = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('cliente');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'colaborador') {
      navigate('/LoginFuncionario');
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
      navigate('/cliente/MeusDadosCliente');
    } catch (err) {
      setError('Login falhou. Verifique suas credenciais.');
    }
  };

  return (
    <div className="form-container">
      <div className="tab-buttons">
        <div className='ativo'>Cliente</div>
        <button
          className='nao-ativo'
          onClick={() => handleTabClick('colaborador')}
        >
          Colaborador
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="E-mail" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Senha" onChange={handleChange} required />
        <a href="/CadastroCliente" className="register-link">Cadastre-se</a>
        <button type="submit" className="login-button">Log In</button>
      </form>
    </div>
  );
};

export default LoginPageCliente;
