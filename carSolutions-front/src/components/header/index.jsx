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

export function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <header className="header">
            <div className="header-container">
                {/* Logo */}
                <div className="logo">
                    <img src="../.scr/.assets/.carsolutionslogo" alt="Logo Car Solutions" />
                </div>

                {/* Links de navegação */}
                <nav className="nav-header">
                    <Link to="/produtos" className="nav-link">Produtos</Link>
                    <Link to="/sobrenosgeral" className="nav-link">Sobre Nós</Link>
                    <Link to="/footer" className="nav-link">Fale Conosco</Link>
                </nav>

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
                            <Link to="/login" className="dropdown-item">Log In</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link to="/cadastro" className="dropdown-item">Cadastre-se</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}

export default Header;
