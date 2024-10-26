// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // URL base do seu backend

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register/`, userData);
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