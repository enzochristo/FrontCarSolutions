import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import whatsappLogo from '../../assets/whatsapplogo.png';
import facebookLogo from '../../assets/facebooklogo.png';
import instagramLogo from '../../assets/instagramlogo.png';
import loclogo from '../../assets/loclogo.png';
import { getUserData } from '../../services/api';

const Footer = React.forwardRef((props, ref) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        setUser(null);
      }
    };

    const token = localStorage.getItem('access_token');
    if (token) {
      fetchUser();
    }
  }, []);

  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <footer ref={ref} className="teste">
      <div className='footer-content'>
        <section>
          <h3>Reserve Nossos Automóveis</h3>
          {user ? (
            <Link to="/cliente/Produtos" className="footer-link" onClick={scrollToTop}>Produtos</Link>
          ) : (
            <Link to="/LoginPageCliente" className="footer-link" onClick={scrollToTop}>Produtos</Link>
          )}
          <h3>Portal Do Cliente</h3>
          {user ? (
            user.isfuncionario ? (
              <Link to="/funcionario/PrincipalFuncionario" className="footer-link" onClick={scrollToTop}>Página Inicial</Link>
            ) : (
              <Link to="/cliente/Paginainicial" className="footer-link" onClick={scrollToTop}>Página Inicial</Link>
            )
          ) : (
            <Link to="/" className="footer-link" onClick={scrollToTop}>Página Inicial</Link>
          )}
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
            <Link to="sobrenosgeral" className='linkclass' onClick={scrollToTop}>Sobre Nós</Link>
            <div className='location'>
              <img src={loclogo} alt="" className='loclogo ' />
              <a href="https://www.google.com/maps/search/?api=1&query=Avenida+Helio+Pelegrino,+1250,+Vila+Olimpia,+SP" target="_blank" rel="noopener noreferrer">
                Avenida Helio Pelegrino 1250, Vila Olimpia, SP
              </a>
            </div>
            <div className='location'>
              <img src={loclogo} alt="" className='loclogo ' />
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
          <a href={`https://wa.me/5511971662048?text=Olá!`}
            target="_blank"
            rel="noopener noreferrer" 
            className='circle'>
            <img src={whatsappLogo} alt="Whatsapp Logo" className="social-logo" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61568275260300" target="_blank" rel="noopener noreferrer" className='circle'>
            <img src={facebookLogo} alt="Facebook Logo" className="social-logo" />
          </a>
          <a href="https://www.instagram.com/carsolutionsijr2024/" target="_blank" rel="noopener noreferrer" className='circle'>
            <img src={instagramLogo} alt="Instagram Logo" className="social-logo" />
          </a>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
