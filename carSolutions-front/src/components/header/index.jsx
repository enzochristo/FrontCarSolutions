import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import carsolutionslogo from '../../assets/carsolutionslogo.png'; // Caminho atualizado da logo
import userIconImage from '../../assets/user-icon.png'; // Caminho atualizado do ícone do usuário

function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="header">
            <div className="logo-container">
                <img src={carsolutionslogo} alt="Logo" className="logo" />
            </div>
            <nav className="nav-header">
                <Link to="/produtos" className="nav-link">Produtos</Link>
                <Link to="/sobrenosgeral" className="nav-link">Sobre Nós</Link>
                <Link to="/footer" className="nav-link">Fale Conosco</Link>
            </nav>
            <div className="user-menu" ref={dropdownRef}>
                <button className="user-icon" onClick={toggleDropdown}>
                    <img src={userIconImage} alt="Ícone do Usuário" className="user-icon-img" />
                </button>
                {dropdownOpen && (
                    <div className="dropdown-menu">
                        <Link to="/LoginPageCliente" className="dropdown-item">Log In</Link>
                        <Link to="/CadastroCliente" className="dropdown-item">Cadastre-se</Link>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
