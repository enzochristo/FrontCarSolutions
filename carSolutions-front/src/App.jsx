import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useRef } from 'react';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'
//GERAL PAGES:
import PrincipalPage from './Pages/GeralPages/PrincipalPage'
import SobreNosGeralPage from './Pages/GeralPages/SobreNosPage';
import RedefinirSenha from './Pages/GeralPages/RedefinirSenhaPage';

// CLIENTES:
// import ConfirmacaoPagamentoPage from './Pages/ClientePages/ConfirmaçãoPagamentoPage'
import LoginPageCliente from './Pages/ClientePages/LoginPage';
import MeusDadosCliente from './Pages/ClientePages/MeusDadosPage'
import PagamentoPage from './Pages/ClientePages/PagamentoPage'
import ConfirmacaoPagamento from './Pages/ClientePages/ConfirmaçãoPagamentoPage';
import ProdutosPage from './Pages/ClientePages/ProdutosPage'
import ResumoCompraPage from './Pages/ClientePages/ResumoCompraPage'
import ResumoAluguelPage from './Pages/ClientePages/ResumoAluguelPage'
import CadastroClientePage from './Pages/ClientePages/CadastroCliente'
import SobreNosClientePage from './Pages/ClientePages/SobreNosPage'
import MinhasReservas from './Pages/ClientePages/MinhasReservas';

// FUNCIONARIOS:
import CadastroVeiculoPage from './Pages/FuncionariosPages/CadastroVeiculoPage'
import EditandoVeiculoPage from './Pages/FuncionariosPages/EditandoVeiculoPage'
import LoginPageFuncionario from './Pages/FuncionariosPages/LoginPage'
import PrincipalPageFuncionario from './Pages/FuncionariosPages/PrincipalPage'
import ProdutosCadastradosPage from './Pages/FuncionariosPages/ProdutosCadastradosPage'
import SobreNosPageFuncionario from './Pages/FuncionariosPages/SobreNosPage';
import CadastroPageFuncionario from './Pages/FuncionariosPages/CadastroFuncionario'

// COMPONENTES:
import Footer from './components/footer';
import Header  from './components/header'; // Importa o Header

function App() {

  const footerRef = useRef(null);

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <div className='App' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' , backgroundColor: '#f2faff'}}>
        {/* Header sempre visível */}
      <Header scrollToFooter={scrollToFooter} />

        {/* Conteúdo principal */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="cliente/HomePage" element={<HomePage />} /> {/* Redireciona de / para /home */}
            {/*Rotas paginas gerais*/}
            <Route path="/" element={<PrincipalPage />} /> {/* Redireciona de / para /home */}
            <Route path="/funcionarioCadastro" element={<CadastroPageFuncionario />} /> {/* Rota para cadastro de funcionário */}
            <Route path="/CadastroCliente" element={<CadastroClientePage />} /> {/* Rota para cadastro de funcionário */}
            <Route path="/sobrenosgeral" element={<SobreNosGeralPage />} /> {/* Rota para a página de teste */}
            <Route path="/api/password-reset-confirm/:token" element={<RedefinirSenha />} />
            <Route path="/LoginFuncionario" element={<LoginPageFuncionario />} />
            <Route path="/LoginPageCliente" element={<LoginPageCliente />} />
            <Route path="/redefinirSenha" element={<RedefinirSenha />} />

            {/*Rotas paginas Funcionários*/}
            <Route path="/funcionario/cadastroVeiculo" element={<ProtectedRoute>  <CadastroVeiculoPage /></ProtectedRoute>} />
            <Route path="/funcionario/EditandoVeiculo/:id" element={<ProtectedRoute>  <EditandoVeiculoPage /></ProtectedRoute>} />
            <Route path="/funcionario/PrincipalFuncionario" element={<ProtectedRoute>  <PrincipalPageFuncionario /></ProtectedRoute>} />
            <Route path="/funcionario/ProdutosCadastrados" element={<ProtectedRoute>  <ProdutosCadastradosPage /></ProtectedRoute>} />
            <Route path="/funcionario/SobreNosFuncionario" element={<ProtectedRoute>  <SobreNosPageFuncionario /></ProtectedRoute>} />

            {/*Rotas paginas Clientes*/}
            <Route path="/cliente/MeusDadosCliente" element={<ProtectedRoute>  <MeusDadosCliente /></ProtectedRoute>} />
            <Route path="/cliente/Pagamento" element={<ProtectedRoute>  <PagamentoPage /></ProtectedRoute>} />
            <Route path="/cliente/ConfirmacaoPagamento" element={<ProtectedRoute>  <ConfirmacaoPagamento /></ProtectedRoute>} />
            <Route path="/cliente/Produtos" element={<ProtectedRoute>  <ProdutosPage /></ProtectedRoute>} />
            <Route path="/cliente/ResumoCompra" element={<ProtectedRoute>  <ResumoCompraPage /></ProtectedRoute>} />
            <Route path="/cliente/ResumoAluguel" element={<ProtectedRoute>  <ResumoAluguelPage /></ProtectedRoute>} />
            <Route path="/cliente/SobreNosCliente" element={<ProtectedRoute>  <SobreNosClientePage /></ProtectedRoute>} />
            <Route path="/cliente/MinhasReservas" element={<ProtectedRoute>  <MinhasReservas /></ProtectedRoute>} />

          </Routes>
        </div>

        {/* Footer sempre visível */}
        <Footer ref={footerRef} />  {/* Passa a ref para o Footer */}
        </div>
    </Router>
  );
}

export default App;
