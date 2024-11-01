import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, fetchAddressByCEP } from '../../../services/api';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

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
  });
  const [error, setError] = useState(null);


  // const [activeTab, setActiveTab] = useState("Cliente");

  const handleTabClick = (tab) => {
    if (tab === "Colaborador") {
      navigate('/funcionarioCadastro');
    }
  };

  const handleGenderSelect = (genderValue) => {
    setFormData({ ...formData, genero: genderValue });
  };

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
      navigate('/LoginPageCliente');
    } catch (err) {
      setError("Erro ao registrar usuário");
    }
  };

  return (
    <div className="form-container">
      <div className="tab-buttons">
        <button className="ativo">Cliente</button>
        <button className="nao-ativo" onClick={() => handleTabClick("Colaborador")}>Colaborador</button>
      </div>

      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <input name="full_name" placeholder="Nome" onChange={handleChange} required />
          <input name="username" placeholder="username" onChange={handleChange} required />
        </div>
        <div className="input-row">
          <input name="cpf" placeholder="CPF" onChange={handleChange} required />
          <input name="email" type="email" placeholder="E-mail" onChange={handleChange} required />
        </div>
        <div className="input-row">
          <input name="nacionalidade" placeholder="Nacionalidade" onChange={handleChange} required />
          <input name="celular" placeholder="Telefone" onChange={handleChange} required />
        </div>
        <div className="input-row-cepgen">
        <select name="genero" placeholder= "genero" onChange={handleChange} required className='genero-cliente' >
            <option value="">Selecione seu gênero</option>            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            <option value="O">Outros</option>
          </select>         
          <input name="cep" placeholder="CEP" onChange={handleChange} onBlur={handleCEPBlur} required className='input-cep'/>
        </div>
        <div className="input-row">
          <input name="rua" placeholder="Rua" value={formData.rua} onChange={handleChange} required />
          <input name="cidade" placeholder="Cidade" value={formData.cidade} onChange={handleChange} required />
        </div>
        <div className='input-row'>
          <input type="text" placeholder="bairro" value={formData.bairro} onChange={handleChange} required/>
          <input name="estado" placeholder="Estado" value={formData.estado} onChange={handleChange} required />
        </div>
        <div className="input-row">
          <input name="numero" placeholder="Número" onChange={handleChange} required />
          <input name="complemento" placeholder="Complemento" onChange={handleChange} />
        </div>
        <div className="input-row">
          <input name="password" type="password" placeholder="Senha" onChange={handleChange} required />
          <input name="password2" type="password" placeholder="Confirmação de senha" onChange={handleChange} required />
        </div>
        <button type="submit" className="login-button">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterClientePage;
