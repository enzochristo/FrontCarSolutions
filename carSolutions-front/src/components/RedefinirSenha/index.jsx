// src/pages/PasswordResetConfirmPage/index.jsx
import React, { useState } from 'react';
import { confirmPasswordReset } from '../../services/api';

const PasswordResetConfirmPage = ({ token }) => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await confirmPasswordReset(token, newPassword);
      setMessage("Senha redefinida com sucesso!");
    } catch (error) {
      setMessage("Erro ao redefinir a senha.");
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

export default PasswordResetConfirmPage;
