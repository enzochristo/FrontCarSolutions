// src/pages/SobreNosPage/index.jsx
import { Button } from '@/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';

function PaginaPrincipal() {
  return (
    <>
        <h2>Página principal dos funcionarios</h2>
        <p>
            Página com os lembrestes e informações importantes para os funcionários
        </p>
        <Button>
          <Link to="/funcionario/ProdutosCadastrados">Estoque</Link>
        </Button>
    </>

  );
}

export default PaginaPrincipal;
