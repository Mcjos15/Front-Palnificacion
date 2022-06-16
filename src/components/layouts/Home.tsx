import React from 'react'
import '../css/home.css'
import Footer from '../shared/Footer'
import { Link
} from "react-router-dom";

import { SideBarMenu } from '../shared/SideBarMenu';

import "../scss/SideBarMenu.scss"
import { SideBarMenuProvider } from '../../context/SideBarMenu-provider';

const Home = () => {

 

    return (
        <SideBarMenuProvider>
            <><header className="bg_animate">
                <div className="header_nav">
                    <div className="contenedor">
                        <h1>Bienvenido</h1>
                        <nav>

                            <Link to="/Config">Config</Link>
                            <Link to="/Documents">Insertar documentos</Link>
                            <a href="/Documents">Insert documentos</a>
                            <a href="/ViewDocument">View documentos</a>

                            <a href="/">Salir</a>
                        </nav>
                    </div>
                </div>
                <section className="banner contenedor">
                    <div className="banner_img">
                        {/* <img src="laptop-support.png" alt=""> */}
                    </div>
                </section>

                <div className="burbujas">
                    <div className="burbuja"></div>
                    <div className="burbuja"></div>
                    <div className="burbuja"></div>
                    <div className="burbuja"></div>
                    <div className="burbuja"></div>
                    <div className="burbuja"></div>
                    <div className="burbuja"></div>
                    <div className="burbuja"></div>
                    <div className="burbuja"></div>
                    <div className="burbuja"></div>
                </div>
            </header>
                <div>
                    <SideBarMenu />
                </div>
                <div>
                    <Footer></Footer>
                </div></>
        </SideBarMenuProvider>
    );
}

export default Home;