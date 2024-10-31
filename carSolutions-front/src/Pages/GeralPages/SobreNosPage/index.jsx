// src/Pages/SobreNosPage/index.jsx
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';


import './index.css';
import primeiraEscolhaLogo from '../../../assets/primeiraEscolhaLogo.png';
import inovacoesLogo from '../../../assets/inovacoesLogo.png';
import excelenciaLogo from '../../../assets/excelenciaLogo.png';
import Carrossel from "../../../components/Carrossel";
import c1 from '../../../assets/sn1.webp';
import c2 from '../../../assets/sn2.webp';
import c3 from '../../../assets/sn3.webp';
import timelineImage2021 from '../../../assets/iniciologo.png';
import timelineImage2022 from '../../../assets/atuallogo.png';
import bannerImg from '../../../assets/bannerimg.png';

function SobreNosPage() {

    const { scrollY } = useScroll(); 
    const yTransform = useTransform(scrollY, [0, 300], [0, -100]); // Controle do deslizamento da imagem ao fazer scroll

    const sections = [
        { title: "Primeira escolha em mobilidade", icon: primeiraEscolhaLogo, content: ["Ser reconhecidos como a solução mais confiável e acessível para aluguel e venda de veículos", "Proporcionar aos nossos clientes uma experiência prática e satisfatória", "Oferecer uma ampla gama de opções para atender a todas as necessidades de mobilidade"] },
        { title: "Inovação contínua", icon: inovacoesLogo, content: ["Oferecer aos clientes as ferramentas mais modernas para aluguel e compra de veículos.", "Investir em plataformas digitais intuitivas.", "Estabelecer parcerias com empresas de tecnologia para melhorar a experiência dos clientes."] },
        { title: "Excelência no atendimento", icon: excelenciaLogo, content: ["Nossa equipe busca constantemente novas maneiras de melhorar o atendimento ao cliente.", "Garantir que cada interação seja positiva e confiável.","Foco em proporcionar uma experiência personalizada e eficiente em todas as etapas."] }
    ];

    const images = [c1, c2, c3];

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

            <motion.div className="timeline-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
                <h2>Nossa História</h2>
                <div className="timeline-container">
                    <motion.div className="timeline-item" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}>
                        <div className="timeline-header">
                            <img src={timelineImage2021} alt="Timeline Icon 2021" className="timeline-icon" />
                            <h3 className="timeline-year">2021</h3>
                        </div>
                        <p>Início da Car Solutions</p>
                    </motion.div>
                    <motion.div className="timeline-item" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}>
                        <div className="timeline-header">
                            <img src={timelineImage2022} alt="Timeline Icon 2022" className="timeline-icon" />
                            <h3 className="timeline-year">2022</h3>
                        </div>
                        <p>Expansão da plataforma digital</p>
                    </motion.div>

                    <motion.div className="timeline-item">
                        <div className="timeline-header">
                            <img src={timelineImage2021} alt="Icone Extra 1" className="timeline-icon" />
                            <h3 className="timeline-year">2023</h3>
                        </div>
                        <p>Lançamento de novos serviços</p>
                    </motion.div>

                    <motion.div className="timeline-item">
                        <div className="timeline-header">
                            <img src={timelineImage2022} alt="Icone Extra 2" className="timeline-icon" />
                            <h3 className="timeline-year">2024</h3>
                        </div>
                        <p>Parcerias estratégicas internacionais</p>
                    </motion.div>

                    <motion.div className="timeline-item">
                        <div className="timeline-header">
                            <img src={timelineImage2021} alt="Icone Extra 3" className="timeline-icon" />
                            <h3 className="timeline-year">2025</h3>
                        </div>
                        <p>Expansão global da Car Solutions</p>
                    </motion.div>

                    <motion.div className="timeline-item">
                        <div className="timeline-header">
                            <img src={timelineImage2022} alt="Icone Extra 4" className="timeline-icon" />
                            <h3 className="timeline-year">2026</h3>
                        </div>
                        <p>Inovações em tecnologia de mobilidade</p>
                    </motion.div>

                </div>
            </motion.div>
            
            <div className='dropdown-carrossel'>
                <motion.div className="carousel-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
                    <h2>Nossas Conquistas</h2>
                    <Carrossel images={images} />
                </motion.div>


                <div>
                    
                </div>
                    <div className="sections-container">
                    <h2 className="section-title">Nossos Objetivos</h2>     
                        
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
        </div>
    );
}

export default SobreNosPage;
