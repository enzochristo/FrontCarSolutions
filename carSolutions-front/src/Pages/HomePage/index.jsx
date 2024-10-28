import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/api';
import './index.css';

const HomePage = () => {
  const navigate = useNavigate();
  const fullName = localStorage.getItem('full_name'); // Obtém o nome completo do usuário

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      await logoutUser(refreshToken);
      // Limpa os dados de autenticação do localStorage após logout
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('full_name');
      navigate('/'); // Redireciona para a página de login após o logout
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    }
  };

  return (
    <div className="home-container">
      <h2>Olá, {fullName}!</h2> {/* Saudação personalizada */}
      <p>Bem-vindo à Car Solutions!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
