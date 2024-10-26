import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import whatsappLogo from '../../assets/whatsapplogo.png';
import facebookLogo from '../../assets/facebooklogo.png';
import instagramLogo from '../../assets/instagramlogo.png';
import loclogo from '../../assets/loclogo.png';

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
          <div className='divlocation'>
          <Link to="">Sobre Nós</Link>
          <div className='location'>
            <img src ={loclogo} alt="" className='loclogo ' />
            <a href="https://www.google.com/maps/search/?api=1&query=Avenida+Helio+Pelegrino,+1250,+Vila+Olimpia,+SP" target="_blank" rel="noopener noreferrer">
                Avenida Helio Pelegrino 1250, Vila Olimpia, SP
              </a>
          </div>
          <div className='location'>
          <img src ={loclogo} alt="" className='loclogo ' />
          <a href="https://www.google.com/maps/search/?api=1&query=Rod.+H%C3%A9lio+Smidt+S%2FN,+Guarulhos,+SP" target="_blank" rel="noopener noreferrer">
                Rod. Hélio Smidt S/N, Guarulhos, SP
              </a>
          </div>
          </div>
        </section>

      </div>

      
      <div className='embaixo-linha'>
        <h4 className='carsol'>
          Car solutions
        </h4>
        <div className="footer-social">
          <a href="https://wa.me/seuNumeroDeWhatsApp" target="_blank" rel="noopener noreferrer" className='circle'>
            <img src={whatsappLogo} alt="Whatsapp Logo" className="social-logo" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className='circle'>
            <img src={facebookLogo} alt="Facebook Logo" className="social-logo" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className='circle'>
            <img src={instagramLogo} alt="Instagram Logo" className="social-logo" />
          </a>
        </div>
      </div>
      
    </footer>
      );
}

// Export default, além da exportação por função
export default Footer;
