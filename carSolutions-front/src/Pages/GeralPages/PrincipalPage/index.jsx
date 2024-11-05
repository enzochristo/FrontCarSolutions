// src/pages/PrincipalPage/index.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./index.css";
import Carrossel from "../../../components/Carrossel";
import BuscaAluguelPrincipal from '@/components/BuscaAluguelPrincipal';
import CarDisplay from '@/components/CarroDisplay';
import { getUserData } from '../../../services/api';
import img1 from "../../../assets/pagp1.png";
import img2 from "../../../assets/pagp2.png";
import img3 from "../../../assets/pagp3.png";
import img4 from "../../../assets/pagp4.png";

// Imagem do carro e fundo decorativo
import carro from "../../../assets/nivuspagp.png";
import fundo from "../../../assets/fundopagp.png";

// Imagem oval como botão
import oval from "../../../assets/ovalpagp.png";

// Imagens para "Nossas Principais Características"
import variedade from "../../../assets/variedadepagp.png";
import facilidade from "../../../assets/facilidadepagp.png";
import promocoes from "../../../assets/promocoespagp.png";

// Imagens para os carros exibidos
import carroexposto1 from "../../../assets/carroexposto1.png";
import carroexposto2 from "../../../assets/carroexposto2.png";

const images = [img1, img2, img3, img4];

function PrincipalPage() {
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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="principal-page">

      {/* Carrossel */}
      <section className="catalog-section">
        <BuscaAluguelPrincipal />
        <h2>Catálogo do Mês</h2>
        <Carrossel images={images} />
      </section>

      {/* Exibição dos carros */}
      <section className="car-display-section">
        <h2>Conheça Nossos Veículos</h2>
        <div className="car-display-container">
          <CarDisplay 
            image={carroexposto1}
            title="Opção de SUV"
            name="SUV Especial"
            description="SUV robusto e espaçoso, ideal para famílias e aventuras. Modelos similares: Jeep Compass, Toyota Corolla Cross."
            price="R$ 199/dia"
          />
          <CarDisplay 
            title="Opção de Sedan"
            image={carroexposto2}
            name="Sedan Conforto"
            description="Sedan confortável e elegante, perfeito para viagens urbanas e rodoviárias. Modelos similares: Honda Civic, Toyota Corolla."
            price="R$ 149/dia"
          />
        </div>

        {/* Botão "Conheça Nossa Frota" com verificação de autenticação */}
        {user ? (
          <Link to="/cliente/Produtos" className="fleet-button" onClick={scrollToTop}>
            Conheça Nossa Frota
          </Link>
        ) : (
          <Link to="/LoginPageCliente" className="fleet-button" onClick={scrollToTop}>
            Conheça Nossa Frota
          </Link>
        )}
      </section>

      {/* Nossos Serviços */}
      <section className="services-section">
        <h2 className="services-title">Nossos Serviços</h2>
        <div className="services-container">
          <div className="car-with-background">
            <img src={fundo} alt="Fundo decorativo" className="background-image" />
            <img src={carro} alt="Imagem de um carro" className="car-image" />
          </div>
          {/* Botões ovais e textos */}
          <div className="buttons-and-text">
            <div className="button-with-text">
              <Link to="/LoginPageCliente" className="oval-button">
                <img src={oval} alt="Botão oval para Aluguel de Carro" />
              </Link>
              <div className="text-content">
                <p className="title">Aluguel de Carro</p>
                <p className="description">Temos orgulho de sempre ir além para nossos clientes.</p>
              </div>
            </div>
            <div className="button-with-text">
              <Link to="/LoginPageCliente" className="oval-button">
                <img src={oval} alt="Botão oval para Compra de Carro" />
              </Link>
              <div className="text-content">
                <p className="title">Compra de Carro</p>
                <p className="description">Vendemos os melhores carros em todo o mundo a um preço competitivo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossas Principais Características */}
      <section className="features-section">
        <h2>Nossas Principais Características</h2>
        <div className="feature-items">
          <div className="feature-item">
            <img src={facilidade} alt="Facilidade na reserva" />
            <h3>Facilidade na reserva e flexibilidade</h3>
            <p>Processo simples e rápido para aluguel de carros, com opções flexíveis para modificar ou cancelar reservas.</p>
          </div>
          <div className="feature-item">
            <img src={variedade} alt="Variedade de Veículos" />
            <h3>Variedade de Veículos</h3>
            <p>Vasta variedade de categorias e carros para você.</p>
          </div>
          <div className="feature-item">
            <img src={promocoes} alt="Promoções" />
            <h3>Promoções</h3>
            <p>Promoções a todo instante, sempre deixando você mais perto do seu sonho.</p>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="values-section">
        <h2 className="values-title">Nossos Valores:</h2>
        <div className="values-content">
          <div className="value-item value-item-top">
            <h3>Atendimento ao Cliente</h3>
            <p>Estamos comprometidos em oferecer um atendimento personalizado, ágil e eficiente. Nossa equipe está sempre pronta para ajudar você a encontrar o veículo ideal e oferecer suporte em todas as etapas do processo.</p>
          </div>
          <div className="value-item-row">
            <div className="value-item">
              <h3>Transparência</h3>
              <p>Acreditamos que a confiança é a base de um bom relacionamento. Por isso, oferecemos informações claras e detalhadas sobre todos os nossos veículos, preços e condições de aluguel ou compra, sem taxas ocultas ou surpresas.</p>
            </div>
            <div className="value-item">
              <h3>Qualidade</h3>
              <p>Nossa frota é composta por veículos rigorosamente inspecionados e mantidos, garantindo que você tenha a melhor experiência possível, seja para aluguel ou compra. A segurança e o conforto dos nossos clientes são nossas prioridades.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PrincipalPage;
