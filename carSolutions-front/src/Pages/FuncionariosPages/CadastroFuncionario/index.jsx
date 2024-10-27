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

const RegisterFuncionarioPage = () => {
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
    isfuncionario: true,
    codigo_funcionario: '',
  });
  const [error, setError] = useState(null);

  const handleTabClick = (tab) => {
    if (tab === "Cliente") {
      navigate('/cliente/cadastro');
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
      navigate('/login');
    } catch (err) {
      setError('Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <div className="form-container">
      <div className="tabs">
        <button className="tab" onClick={() => handleTabClick("Cliente")}>Cliente</button>
        <button className="tab active">Colaborador</button>
      </div>

      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <input name="full_name" placeholder="Nome" onChange={handleChange} required />
          <input name="cpf" placeholder="CPF" onChange={handleChange} required />
        </div>
        <div className="input-row">
          <input name="email" type="email" placeholder="E-mail" onChange={handleChange} required />
          <input name="celular" placeholder="Telefone" onChange={handleChange} required />
        </div>
        <div className="input-row">
          <input name="nacionalidade" placeholder="Nacionalidade" onChange={handleChange} required />

          {/* Dropdown de Gênero usando shadcn/ui */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="dropdown-trigger">
                {formData.genero ? (formData.genero === "M" ? "Masculino" : formData.genero === "F" ? "Feminino" : "Outro") : "Gênero"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dropdown-menu">
              <DropdownMenuItem onSelect={() => handleGenderSelect("M")}>
                Masculino
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleGenderSelect("F")}>
                Feminino
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleGenderSelect("O")}>
                Outro
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="input-row">
          <input name="cep" placeholder="CEP" onChange={handleChange} onBlur={handleCEPBlur} required />
          <input name="rua" placeholder="Rua" value={formData.rua} onChange={handleChange} required />
        </div>
        <div className="input-row">
          <input name="cidade" placeholder="Cidade" value={formData.cidade} onChange={handleChange} required />
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
        <input name="codigo_funcionario" placeholder="Token passado pelo RH" onChange={handleChange} required />
        <button type="submit" className="submit-button">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterFuncionarioPage;
