// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // URL base do seu backend

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register/`, userData);
};

// Api para inserir dados de CEP
export const fetchAddressByCEP = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        throw new Error("CEP não encontrado");
      }
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
      throw error;
    }
  };

export const loginUser = async (credentials) => {
    // Faz a requisição de login para o backend
    const response = await axios.post(`${API_URL}/login/`, credentials);
  
    // Armazena o access_token e refresh_token no localStorage
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
  
    // Armazena informações do usuário, assumindo que o backend as envia no corpo da resposta
    localStorage.setItem('full_name', response.data.full_name); // Nome completo do usuário
  
    return response;
  };

export const logoutUser = async (refreshToken) => {
    // Envia o refresh token no corpo da requisição
    return await axios.post(
        `${API_URL}/logout/`,
        { refresh: refreshToken },
        {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Opcional, dependendo do backend
        },
        }
    );
    };

// Função para solicitar redefinição de senha
export const requestPasswordReset = async (email) => {
    return await axios.post(`${API_URL}/password-reset/`, { email });
  };
  
// Função para redefinir a senha
export const confirmPasswordReset = async (token, newPassword) => {
  return await axios.put(`${API_URL}/password-reset-confirm/${token}/`, {
    new_password: newPassword,
    token: token  // Inclui o token no corpo da requisição
  });
};