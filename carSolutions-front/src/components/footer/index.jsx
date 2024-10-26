import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export function Footer() {
  return (
    <footer>
      <div className='footer-content'>
        <section >
          <h3>Reserve Nossos Automóveis</h3>
          <Link to="/PaginaProdutos">Produtos</Link>
          <h3>Portal Do Cliente</h3>
          <Link to="/Paginainicial">Pagina Inicial</Link>
        </section>

        <section>
          <h3>Serviços Ao Cliente</h3>
          <address>
            <p>Número De Telefone: 11 97711-4982</p>  
          </address>
        </section>

        <section>
          <h3>Companhia</h3>
          <Link to="">Sobre Nós</Link>
          <a href=""></a>
          <a href=""></a>
          <img src="" alt="" />
          <img src="" alt="" />
        </section>

      </div>

      <hr />
      <div>
        <p className='carsol'>
          Car solutions
        </p>
        <nav>
          <a href=""></a>
          <a href=""></a>
          <a href=""></a>
        </nav>
      </div>
      
    </footer>
      );
}

// Export default, além da exportação por função
export default Footer;
