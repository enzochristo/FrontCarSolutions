// src/pages/PasswordResetConfirmPage/index.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { confirmPasswordReset } from '../../../services/api';

const RedefinirSenhaPage = () => {
  const { token } = useParams();  // Extrai o token da URL
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await confirmPasswordReset(token, newPassword);  // Envia o token e a nova senha
      setMessage("Senha redefinida com sucesso! Redirecionando para o login...");
      setTimeout(() => navigate('/login'), 3000);  // Redireciona após 3 segundos
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.detail || "Erro ao redefinir a senha.");
      } else {
        setMessage("Erro ao redefinir a senha. Verifique o link ou tente novamente.");
      }
    }
  };

  return (
    <div>
      <h2>Redefinir Senha</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nova senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Redefinir Senha</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RedefinirSenhaPage;
