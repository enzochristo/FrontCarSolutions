import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User } from "lucide-react";
import carsolutionslogo from "../../assets/carsolutionslogo.png";

export function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <header className="header">
            {/* Logo */}
            <img src={carsolutionslogo} alt="Logo Car Solutions" className='fotologo'/>

            {/* Links de navegação */}
            <Link to="/produtos" className="nav-link">Produtos</Link>
            <Link to="/sobrenosgeral" className="nav-link">Sobre Nós</Link>
            <Link to="/footer" className="nav-link">Fale Conosco</Link>

            {/* Dropdown Menu - Ícone do usuário */}
            <DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)}>
                <DropdownMenuTrigger asChild>
                    <button
                        className={`user-icon ${isDropdownOpen ? 'user-icon-active' : ''}`}
                    >
                        <User size={32} />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="dropdown-menu">
                    <DropdownMenuItem asChild>
                        <Link to="/LoginPageCliente" className="dropdown-item">Log In</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to="/CadastroCliente" className="dropdown-item">Cadastre-se</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}

export default Header;
