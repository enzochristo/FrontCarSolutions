import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './Pages/ClientePages/LoginPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import SobreNosPage from './Pages/GeralPages/SobreNosPage'; // Importa a página de teste


// CLIENTES:
import ConfirmacaoPagamentoPage from './Pages/ClientePages/ConfirmaçãoPagamentoPage'
import LoginPageCliente from './Pages/ClientePages/LoginPage';
import MeusDadosCliente from './Pages/ClientePages/MeusDadosPage'
import PagamentoPage from './Pages/ClientePages/PagamentoPage'
import PrincipalPage from './Pages/ClientePages/PrincipalPage'
import ProdutosPage from './Pages/ClientePages/ProdutosPage'
import ResumoCompraPage from './Pages/ClientePages/ResumoCompraPage'
import ResumoAluguelPage from './Pages/ClientePages/ResumoAluguelPage'


// FUNCIONARIOS:
import CadastroVeiculoPage from './Pages/FuncionariosPages/CadastroVeiculoPage'
import EditandoVeiculoPage from './Pages/FuncionariosPages/EditandoVeiculoPage'
import LoginPageFuncionario from './Pages/FuncionariosPages/LoginPage'
import PrincipalPageFuncionario from './Pages/FuncionariosPages/PrincipalPage'
import ProdutosCadastradosPage from './Pages/FuncionariosPages/ProdutosCadastradosPage'
import SobreNosPageFuncionario from './Pages/FuncionariosPages/SobreNosPage';

// COMPONENTES:
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Conteúdo principal */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} /> {/* Redireciona de / para /home */}
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route path="/sobrenos" element={<SobreNosPage />} /> {/* Rota para a página de teste */}
          </Routes>
        </div>
        {/* Footer sempre visível */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
