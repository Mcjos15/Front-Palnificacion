import React from 'react'
import '../css/home.css'
import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <header className="bg_animate">
            <div className="header_nav">
                <div className="contenedor">
                    <h1>Bienvenido</h1>
                    <nav>
                    <Link to="/Config">Configuraciones</Link>
                    <Link to="#">Mi perfil</Link>
                    <Link to="/">Salir</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Navbar;