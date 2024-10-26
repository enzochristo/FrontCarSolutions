// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import RegisterClientePage from './pages/CadastroCliente';
import RegisterFuncionarioPage from './pages/CadastroFuncionario';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-cliente" element={<RegisterClientePage />} />        
        <Route path="/register-funcionario" element={<RegisterFuncionarioPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
