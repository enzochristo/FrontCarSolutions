import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';

//GERAL PAGES:
// import PrincipalPage from './Pages/GeralPages/PrincipalPage'
import SobreNosGeralPage from './Pages/GeralPages/SobreNosPage';

// CLIENTES:
// import ConfirmacaoPagamentoPage from './Pages/ClientePages/ConfirmaçãoPagamentoPage'
import LoginPageCliente from './Pages/ClientePages/LoginPage';
// import MeusDadosCliente from './Pages/ClientePages/MeusDadosPage'
// import PagamentoPage from './Pages/ClientePages/PagamentoPage'
// import PrincipalPage from './Pages/ClientePages/PrincipalPage'
// import ProdutosPage from './Pages/ClientePages/ProdutosPage'
// import ResumoCompraPage from './Pages/ClientePages/ResumoCompraPage'
// import ResumoAluguelPage from './Pages/ClientePages/ResumoAluguelPage'
// import CadastroClientePage from './Pages/ClientePages/CadastroCliente'
// import SobreNosClientePage from './Pages/ClientePages/SobreNosPage'
import CadastroCliente from './Pages/ClientePages/CadastroCliente'

// FUNCIONARIOS:
// import CadastroVeiculoPage from './Pages/FuncionariosPages/CadastroVeiculoPage'
// import EditandoVeiculoPage from './Pages/FuncionariosPages/EditandoVeiculoPage'
import LoginPageFuncionario from './Pages/FuncionariosPages/LoginPage'
// import PrincipalPageFuncionario from './Pages/FuncionariosPages/PrincipalPage'
// import ProdutosCadastradosPage from './Pages/FuncionariosPages/ProdutosCadastradosPage'
// import SobreNosPageFuncionario from './Pages/FuncionariosPages/SobreNosPage';
// import CadastroPageFuncionario from './Pages/FuncionariosPages/CadastroFuncionario'
import RegisterFuncionarioPage from './Pages/FuncionariosPages/CadastroFuncionario';

// GERAL:
import RedefinirSenha from './Pages/GeralPages/RedefinirSenhaPage';

// COMPONENTES:
import Footer from './components/footer';
import Header  from './components/header'; // Importa o Header

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' , backgroundColor: '#FFFBF3'}}>
        {/* Header sempre visível */}
        <Header />

        {/* Conteúdo principal */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} /> {/* Redireciona de / para /home */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            <Route path="/sobrenosgeral" element={<SobreNosGeralPage />} /> {/* Rota para a página de teste */}
            <Route path="/api/password-reset-confirm/:token" element={<RedefinirSenha />} />
            <Route path="/funcionario/cadastro" element={<RegisterFuncionarioPage />} /> {/* Rota para cadastro de funcionário */}
            <Route path='/cliente/cadastro' element={<CadastroCliente/>} />
            <Route path='/cliente/login' element={<LoginPageCliente />} />
            <Route path='/funcionario/login' element={<LoginPageFuncionario />} />


            

          </Routes>
        </div>

        {/* Footer sempre visível */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
