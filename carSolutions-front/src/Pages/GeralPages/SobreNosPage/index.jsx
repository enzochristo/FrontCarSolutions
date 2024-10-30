import React from 'react';
import './index.css';
import primeiraEscolhaLogo from '../../../assets/primeiraescolhalogo.png';
import inovacoesLogo from '../../../assets/inovacoeslogo.png';
import excelenciaLogo from '../../../assets/excelencialogo.png';

function SobreNosPage() {
    const sections = [
        {
            title: "Primeira escolha em mobilidade",
            icon: primeiraEscolhaLogo,
            content: [
                "Nosso principal objetivo é ser reconhecidos como a solução mais confiável e acessível para aluguel e venda de veículos.",
                "Proporcionamos aos nossos clientes uma experiência prática e satisfatória com uma ampla gama de opções.",
                "Nosso foco é atender a todas as necessidades de mobilidade, com flexibilidade e segurança."
            ]
        },
        {
            title: "Inovação contínua",
            icon: inovacoesLogo,
            content: [
                "Queremos estar à frente das mudanças tecnológicas no setor automotivo e de mobilidade.",
                "Oferecemos ferramentas modernas para facilitar o processo de aluguel ou compra de veículos.",
                "Investimos em parcerias tecnológicas para melhorar a experiência dos nossos clientes."
            ]
        },
        {
            title: "Excelência no atendimento",
            icon: excelenciaLogo,
            content: [
                "Nossa equipe busca continuamente melhorar o atendimento ao cliente com uma abordagem personalizada.",
                "Trabalhamos para superar as expectativas dos nossos clientes em cada interação.",
                "Garantimos que o atendimento seja positivo, eficiente e confiável em todas as etapas."
            ]
        }
    ];

    return (
        <div className="sobre-nos-page">
            <div className="sobre-nos-container">
                <h1>Sobre Nós</h1>
                <p>A Car Solutions é especializada em aluguel e venda de veículos, oferecendo soluções práticas e eficientes para nossos clientes. Com ampla experiência no setor, disponibilizamos uma variedade de veículos, de modelos simples a populares, com foco em flexibilidade, conforto e segurança. Nosso objetivo é tornar a experiência do cliente mais fácil e personalizada, seja no aluguel ou na compra de um carro.</p>
            </div>
            <div className="sections-container">
                {sections.map((section, index) => (
                    <div key={index} className="dropdown-section">
                        <div className="dropdown-title">
                            <img src={section.icon} alt={`${section.title} icon`} className="dropdown-icon" />
                            {section.title}
                        </div>
                        <div className="dropdown-content">
                            <ul>
                                {section.content.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SobreNosPage;
