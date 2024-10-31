// src/components/Banner/index.jsx
import React from 'react';
import { motion } from 'framer-motion';
import bannerImage from '../../assets/bannerimg.png'; // Importação explícita da imagem

function Banner({ title }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="banner"
            style={{ backgroundImage: `url(${bannerImage})` }} // Usa a imagem importada
        >
            <div className="banner-content">
                <h1>{title}</h1>
            </div>
        </motion.div>
    );
}

export default Banner;
