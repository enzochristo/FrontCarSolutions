// src/pages/RegisterClientePage/index.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, fetchAddressByCEP} from '../../services/api';
import './index.css';

const RegisterClientePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    full_name: '',
    cpf: '',
    celular: '',
    nacionalidade: '',
    cep: '',
    numero: '',
    complemento: '',
    cidade: '',
    estado: '',
    rua: '',
    bairro: '',
    genero: '',
    isfuncionario: false,  // Define como cliente
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCEPBlur = async () => {
    try {
      const address = await fetchAddressByCEP(formData.cep);
      setFormData((prevFormData) => ({
        ...prevFormData,
        rua: address.logradouro,
        bairro: address.bairro,
        cidade: address.localidade,
        estado: address.uf,
      }));
    } catch (error) {
      setError("CEP não encontrado");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate('/login'); // Redireciona para login após o registro bem-sucedido
    } catch (err) {
      setError('Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Cliente</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Senha" onChange={handleChange} required />
        <input name="password2" type="password" placeholder="Confirme a Senha" onChange={handleChange} required />
        <input name="full_name" placeholder="Nome Completo" onChange={handleChange} required />
        <input name="cpf" placeholder="CPF" onChange={handleChange} required />
        <input name="celular" placeholder="Celular" onChange={handleChange} required />
        <input name="nacionalidade" placeholder="Nacionalidade" onChange={handleChange} required />
        
        <input
          name="cep"
          placeholder="CEP"
          onChange={handleChange}
          onBlur={handleCEPBlur}  // Busca endereço ao sair do campo
          required
        />
        <input name="rua" placeholder="Rua" value={formData.rua} onChange={handleChange} required />
        <input name="bairro" placeholder="Bairro" value={formData.bairro} onChange={handleChange} required />
        <input name="cidade" placeholder="Cidade" value={formData.cidade} onChange={handleChange} required />
        <input name="estado" placeholder="Estado" value={formData.estado} onChange={handleChange} required />
        
        <input name="numero" placeholder="Número" onChange={handleChange} required />
        <input name="complemento" placeholder="Complemento" onChange={handleChange} />
        
        <select name="genero" onChange={handleChange} required>
          <option value="">Selecione o Gênero</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
          <option value="O">Outros</option>
        </select>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterClientePage;
