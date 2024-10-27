// src/pages/PasswordResetRequestPage/index.jsx
import React, { useState } from 'react';
import { requestPasswordReset } from '../../services/api';

const PasswordResetRequestPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await requestPasswordReset(email);
      setMessage("Email de redefinição enviado!");
    } catch (error) {
      setMessage("Erro ao solicitar redefinição de senha.");
    }
  };

  return (
    <div>
      <h2>Recuperar Senha</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordResetRequestPage;
