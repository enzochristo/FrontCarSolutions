import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import './index.css';
import primeiraEscolhaLogo from '../../../assets/primeiraEscolhaLogo.png';
import inovacoesLogo from '../../../assets/inovacoesLogo.png';
import excelenciaLogo from '../../../assets/excelenciaLogo.png';
import timelineImage2021 from '../../../assets/iniciologo.png';
import timelineImage2022 from '../../../assets/tecnologiasobrenos.png';
import timelineImage2023 from '../../../assets/inovacaosobrenos.png';
import timelineImage2024 from '../../../assets/atuallogo.png';
import timelineImage2025 from '../../../assets/globalsobrenos.png';
import timelineImage2026 from '../../../assets/acordosobrenos.png';

import bannerImg from '../../../assets/testesobrenos.png';
import ceoImg from '../../../assets/ceosobrenos.png';

function SobreNosPage() {

    const { scrollY } = useScroll(); 
    const yTransform = useTransform(scrollY, [0, 300], [0, -100]);

    const sections = [
        { 
            title: "Primeira escolha em mobilidade", 
            icon: primeiraEscolhaLogo, 
            content: "Nossa prioridade é oferecer opções que garantem praticidade e satisfação em mobilidade." 
        },
        { 
            title: "Inovação contínua", 
            icon: inovacoesLogo, 
            content: "Investimos constantemente em ferramentas modernas para aluguel e compra de veículos." 
        },
        { 
            title: "Excelência no atendimento", 
            icon: excelenciaLogo, 
            content: "Oferecemos um atendimento personalizado e confiável em todas as interações com nossos clientes." 
        }
    ];

    const itemVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    };

    const timelineEvents = [
        { year: '2021', description: 'Início da Car Solutions', icon: timelineImage2021 },
        { year: '2022', description: 'Expansão da plataforma digital', icon: timelineImage2022 },
        { year: '2023', description: 'Lançamento de novos serviços', icon: timelineImage2023 },
        { year: '2024', description: 'Parcerias estratégicas internacionais', icon: timelineImage2024 },
        { year: '2025', description: 'Expansão global da Car Solutions', icon: timelineImage2025 },
        { year: '2026', description: 'Inovações em tecnologia de mobilidade', icon: timelineImage2026 }
    ];

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
                <h2>História e Perspectiva</h2>
                <div className="timeline-container">
                    {timelineEvents.map((event, index) => (
                        <motion.div
                            key={event.year}
                            className="timeline-item"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            variants={itemVariants}
                        >
                            <div className="timeline-header">
                                <img src={event.icon} alt={`Timeline Icon ${event.year}`} className="timeline-icon" />
                                <h3 className="timeline-year">{event.year}</h3>
                            </div>
                            <p>{event.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Objetivos sempre visíveis */}
            <h2 className="h2-NO">Nossos Objetivos</h2>
            <div className="objetivos-carrossel">
                {sections.map((section, index) => (
                    <motion.div
                        key={index}
                        className="objetivo-section"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0 }
                        }}
                    >
                        <div className="objetivo-header">
                            <img src={section.icon} alt={`${section.title} icon`} className="objetivo-icon" />
                            <h3>{section.title}</h3>
                        </div>
                        <div className="objetivo-content">
                            <p>{section.content}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default SobreNosPage;
