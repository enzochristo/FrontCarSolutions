// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // URL base do seu backend

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register/`, userData);
};

export const getUserData = async () => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.get(`${API_URL}/meusdados/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    throw error;
  }
};

export const updateUserData = async (updatedData) => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.put(`${API_URL}/meusdados/`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar dados do usuário:", error);
    throw error;
  }
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

// Adiciona um novo carro

export const getCarById = async (id) => {
  console.log(id);
  const response = await axios.get(`${API_URL}/cars/dados/${id['id']}/`);
  return response.data;
};

export const createCar = async (carData) => {
  const token = localStorage.getItem('access_token');
  return await axios.post(`${API_URL}/cars/`, carData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Atualiza um carro existente
export const updateCar = async (carId, carData) => {
  const token = localStorage.getItem('access_token');
  return await axios.patch(`${API_URL}/cars/${carId['id']}/`, carData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Deleta um carro
export const deleteCar = async (carId) => {
  const token = localStorage.getItem('access_token');
  return await axios.delete(`${API_URL}/cars/${carId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Lista todos os carros
export const fetchCars = async () => {
  const token = localStorage.getItem('access_token');
  return await axios.get(`${API_URL}/cars/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// src/services/api.js
// src/services/api.js
export const getAvailableCarsByDate = async (filters = {}) => {
  let token = localStorage.getItem('access_token');

  // Construindo os parâmetros corretamente
  const params = new URLSearchParams();

  if (filters.dataRetirada) params.append('dataRetirada', filters.dataRetirada);
  if (filters.horarioRetirada) params.append('horaRetirada', filters.horarioRetirada);
  if (filters.dataDevolucao) params.append('dataDevolucao', filters.dataDevolucao);
  if (filters.horarioDevolucao) params.append('horaDevolucao', filters.horarioDevolucao);

  try {
    const response = await axios.get(`${API_URL}/available/?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // Se o erro for de autorização, tenta revalidar o token
    if (error.response && error.response.status === 401) {
      token = await refreshAccessToken();
      if (token) {
        // Tenta novamente a requisição com o novo token
        const retryResponse = await axios.get(`${API_URL}/available/?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return retryResponse.data;
      }
    }
    console.error("Erro ao buscar carros disponíveis no período:", error);
    return [];
  }
};


export const getAvailableCars = async (filters = {}) => {
  let token = localStorage.getItem('access_token');
  const params = new URLSearchParams(filters).toString();

  try {
    const response = await axios.get(`${API_URL}/available/?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // Se o erro for de autorização, tenta revalidar o token
    if (error.response && error.response.status === 401) {
      token = await refreshAccessToken();
      if (token) {
        // Tenta novamente a requisição com o novo token
        const retryResponse = await axios.get(`${API_URL}/available/?${params}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return retryResponse.data;
      }
    }
    console.error("Erro ao carregar dados dos carros:", error);
    return [];
  }
};

// Cria uma nova reserva para um carro
export const criarReserva = async (reservaData) => {
  const token = localStorage.getItem('access_token');
  return await axios.post(`${API_URL}/reservations/`, reservaData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Função para buscar lembretes
// Função para buscar todos os lembretes
export const fetchLembretes = async () => {
  const token = localStorage.getItem('access_token');
  return await axios.get(`${API_URL}/lembretes/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Função para adicionar um novo lembrete
export const addLembrete = async (lembreteData) => {
  const token = localStorage.getItem('access_token');
  return await axios.post(`${API_URL}/lembretes/`, lembreteData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Função para marcar um lembrete como OK
export const markLembreteAsOk = async (lembreteId) => {
  const token = localStorage.getItem('access_token');
  return await axios.patch(`${API_URL}/lembretes/${lembreteId}/ok/`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
    console.error("Token de atualização não encontrado.");
    return;
  }
  
  try {
    const response = await axios.post(`${API_URL}/token/refresh/`, {
      refresh: refreshToken,
    });
    localStorage.setItem('access_token', response.data.access);
    return response.data.access;
  } catch (error) {
    console.error("Erro ao atualizar o token:", error);
    return null;
  }
};