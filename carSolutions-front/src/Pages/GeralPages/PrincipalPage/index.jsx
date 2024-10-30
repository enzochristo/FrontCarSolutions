// src/pages/PrincipalPage/index.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import "./index.css";
import Carrossel from "../../../components/Carrossel";
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

const images = [img1, img2, img3, img4];

function PrincipalPage() {
  return (
    <div className="principal-page">
      {/* Carrossel */}
      <section className="catalog-section">
        <h2>Catálogo do Mês</h2>
        <Carrossel images={images} />
      </section>

      {/* Nossos Serviços */}
      <section className="services-section">
        <div className="services-container">
          {/* Imagem do carro com fundo decorativo */}
          <div className="car-with-background">
            <img src={fundo} alt="Fundo decorativo" className="background-image" />
            <img src={carro} alt="Imagem de um carro" className="car-image" />
          </div>
          
          {/* Botões ovais e textos à direita */}
          <div className="buttons-and-text">
            <h2 className="services-title">Nossos Serviços</h2>
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
