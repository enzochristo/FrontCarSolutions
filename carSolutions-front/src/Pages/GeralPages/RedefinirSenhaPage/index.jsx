import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { confirmPasswordReset } from '../../../services/api';
import './index.css';

const RedefinirSenhaPage = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await confirmPasswordReset(token, newPassword);
      setMessage("Senha redefinida com sucesso! Redirecionando para o login...");
      setTimeout(() => navigate('/LoginPageCliente'), 3000);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.detail || "Erro ao redefinir a senha.");
      } else {
        setMessage("Erro ao redefinir a senha. Verifique o link ou tente novamente.");
      }
    }
  };

  return (
    <div className="password-reset-page">
      <div className="form-container-reset">
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
        {message && (
          <p className={message.includes("sucesso") ? "message" : "error-message"}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default RedefinirSenhaPage;
