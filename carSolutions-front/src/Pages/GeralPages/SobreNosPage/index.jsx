// src/Pages/SobreNosPage/index.jsx
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import './index.css';
import primeiraEscolhaLogo from '../../../assets/primeiraEscolhaLogo.png';
import inovacoesLogo from '../../../assets/inovacoesLogo.png';
import excelenciaLogo from '../../../assets/excelenciaLogo.png';
import timelineImage2021 from '../../../assets/iniciologo.png';
import timelineImage2022 from '../../../assets/atuallogo.png';
import bannerImg from '../../../assets/testesobrenos.png';
import ceoImg from '../../../assets/ceosobrenos.png';

function SobreNosPage() {

    const { scrollY } = useScroll(); 
    const yTransform = useTransform(scrollY, [0, 300], [0, -100]);

    const sections = [
        { title: "Primeira escolha em mobilidade", icon: primeiraEscolhaLogo, content: ["Proporcionar aos nossos clientes uma experiência prática e satisfatória", "Oferecer uma ampla gama de opções para atender a todas as necessidades de mobilidade"] },
        { title: "Inovação contínua", icon: inovacoesLogo, content: ["Oferecer aos clientes as ferramentas mais modernas para aluguel e compra de veículos.", "Investir em plataformas digitais intuitivas."] },
        { title: "Excelência no atendimento", icon: excelenciaLogo, content: ["Garantir que cada interação seja positiva e confiável.","Foco em proporcionar uma experiência personalizada e eficiente em todas as etapas."] }
    ];

    const itemVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <div className="sobre-nos-page">
            <motion.div 
                className="banner-section"
                style={{
                    backgroundImage: `url(${bannerImg})`,
                    y: yTransform
                }}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
            >
                <div className="banner-text">
                    <h1>Mobilidade com Confiabilidade e Inovação</h1>
                </div>
            </motion.div>

            <div className="ceo-section">
                <div className="ceo-image">
                    <img src={ceoImg} alt="CEO da Empresa" />
                </div>
                <div className="ceo-text">
                    <p className="ceo-message">
                        "Nossa missão é transformar a mobilidade com inovação e confiança. Cada decisão e 
                        cada passo que tomamos visa oferecer o melhor para nossos clientes. A Car Solutions 
                        é um reflexo dos nossos valores e compromisso com a excelência. Acreditamos em um 
                        futuro onde a mobilidade é acessível e prática para todos."
                    </p>
                    <p className="ceo-name">
                        <strong>Ethan</strong><br />
                        CEO da Car Solutions
                    </p>
                </div>
            </div>

            {/* Linha do tempo com animação de aparecimento */}
            <motion.div className="timeline-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
                <h2>Nossa História</h2>
                <div className="timeline-container">
                    {['2021', '2022', '2023', '2024', '2025', '2026'].map((year, index) => (
                        <motion.div
                            key={year}
                            className="timeline-item"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index >= 4 ? 1 : index * 0.2 }}
                            variants={itemVariants}
                        >
                            <div className="timeline-header">
                                <img src={index % 2 === 0 ? timelineImage2021 : timelineImage2022} alt={`Timeline Icon ${year}`} className="timeline-icon" />
                                <h3 className="timeline-year">{year}</h3>
                            </div>
                            <p>{year === '2021' ? 'Início da Car Solutions' : year === '2022' ? 'Expansão da plataforma digital' : year === '2023' ? 'Lançamento de novos serviços' : year === '2024' ? 'Parcerias estratégicas internacionais' : year === '2025' ? 'Expansão global da Car Solutions' : 'Inovações em tecnologia de mobilidade'}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Dropdowns em linha horizontal */}
            <h2>Nossos Objetivos</h2>
            <div className="dropdown-carrossel">
                {sections.map((section, index) => (
                    <motion.div 
                        key={index} 
                        className="dropdown-section"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        variants={itemVariants}
                    >
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
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default SobreNosPage;
