// src/Pages/MeusDados/MeusDados.js

import React, { useEffect, useState } from 'react';
import { getUserData, updateUserData } from '../../../services/api';
import './index.css';
import dadosPessoaisIcon from '../../../assets/dadospessoaislogo.png'; // Caminho para o ícone de Dados Pessoais
import enderecoIcon from '../../../assets/endlogo.png'; // Caminho para o ícone de Endereço

function MeusDados() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar edição
  const [formData, setFormData] = useState({}); // Dados do formulário de edição

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
        setFormData(data); // Inicializa o formulário com os dados do usuário
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updatedData = await updateUserData(formData);
      setUserData(updatedData); // Atualiza os dados exibidos
      setIsEditing(false); // Sai do modo de edição
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      alert("Erro ao atualizar dados. Tente novamente.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!userData) return <p>Erro ao carregar os dados do usuário.</p>;

  return (
    <div className="meus-dados-container">
      <h2>Meus Dados</h2>

      {/* Seção Dados Pessoais */}
      <div className="dados-pessoais-box">
        <div className="dados-pessoais-header">
          <img src={dadosPessoaisIcon} alt="Ícone Dados Pessoais" className="dados-pessoais-icon" />
          <span className="dados-pessoais-text">Dados Pessoais</span>
        </div>
        <div className="user-info">
          <label>
            <strong>Nome Completo:</strong>
            <input
              type="text"
              name="full_name"
              value={formData.full_name || ""}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              disabled={!isEditing}
            />
          </label>
          <label>
            <strong>Email:</strong>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Digite seu email"
              disabled={!isEditing}
            />
          </label>
          <label>
            <strong>CPF:</strong>
            <input
              type="text"
              name="cpf"
              value={formData.cpf || ""}
              onChange={handleChange}
              placeholder="Digite seu CPF"
              disabled={!isEditing}
            />
          </label>
          <label>
            <strong>Celular:</strong>
            <input
              type="text"
              name="celular"
              value={formData.celular || ""}
              onChange={handleChange}
              placeholder="Digite seu número de celular"
              disabled={!isEditing}
            />
          </label>
        </div>
      </div>

      {/* Seção Endereço */}
    <div className="endereco-box">
      <div className="endereco-header">
        <img src={enderecoIcon} alt="Ícone Endereço" className="endereco-icon" />
        <span className="endereco-text">Dados de Localização</span>
      </div>
      <div className="user-info">
        <label>
          <strong>Endereço:</strong>
          <input
            type="text"
            name="rua"
            value={formData.rua || ""}
            onChange={handleChange}
            placeholder="Digite seu endereço"
            disabled={!isEditing}
          />
        </label>
        <div className="cep-complement">
          <label>
            <strong>CEP:</strong>
            <input
              type="text"
              name="cep"
              value={formData.cep || ""}
              onChange={handleChange}
              placeholder="Digite seu CEP"
              disabled={!isEditing}
            />
          </label>
          <label>
            <strong>Complemento:</strong>
            <input
              type="text"
              name="numero"
              value={formData.numero || ""}
              onChange={handleChange}
              placeholder="Número"
              disabled={!isEditing}
            />
          </label>
        </div>
        <label>
          <strong>Bairro:</strong>
          <input
            type="text"
            name="bairro"
            value={formData.bairro || ""}
            onChange={handleChange}
            placeholder="Digite seu bairro"
            disabled={!isEditing}
          />
        </label>
        <div className="city-state">
          <label>
            <strong>Cidade:</strong>
            <input
              type="text"
              name="cidade"
              value={formData.cidade || ""}
              onChange={handleChange}
              placeholder="Digite sua cidade"
              disabled={!isEditing}
            />
          </label>
          <label>
            <strong>Estado:</strong>
            <input
              type="text"
              name="estado"
              value={formData.estado || ""}
              onChange={handleChange}
              placeholder="Digite seu estado"
              disabled={!isEditing}
            />
          </label>
        </div>
      </div>
    </div>

      {isEditing ? (
        <button className='btn-meusdados' onClick={handleSave}>Salvar</button>
      ) : (
        <button className='btn-meusdados' onClick={() => setIsEditing(true)}>Editar</button>
      )}
    </div>
  );
}

export default MeusDados;
