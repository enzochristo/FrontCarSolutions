// src/pages/RegisterFuncionarioPage/index.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api';
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
    isfuncionario: true,  // Define como funcionário
    codigo_funcionario: '',  // Campo de código
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      <h2>Cadastro de Funcionário</h2>
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
        <input name="cep" placeholder="CEP" onChange={handleChange} required />
        <input name="numero" placeholder="Número" onChange={handleChange} required />
        <input name="complemento" placeholder="Complemento" onChange={handleChange} />
        <input name="cidade" placeholder="Cidade" onChange={handleChange} required />
        <input name="estado" placeholder="Estado" onChange={handleChange} required />
        <input name="rua" placeholder="Rua" onChange={handleChange} required />
        <input name="bairro" placeholder="Bairro" onChange={handleChange} required />
        <select name="genero" onChange={handleChange} required>
          <option value="">Selecione o Gênero</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
          <option value="O">Outros</option>
        </select>
        <input name="codigo_funcionario" placeholder="Código de Funcionário" onChange={handleChange} required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterFuncionarioPage;
