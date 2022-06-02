import React from 'react'
import '../css/home.css'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'

const Home = () => {

    return (

        <><header className="bg_animate">
            <div className="header_nav">
                <div className="contenedor">
                    <h1>Bienvenido</h1>
                    <nav>
                        <a href="/Config">Configuraciones</a>
                        <a href="/Documents">Insert documentos</a>
                        <a href="/ViewDocument">View documentos</a>
                        <a href="#">Mi perfil</a>
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
        </header><div>
                <Footer></Footer>
            </div></>
    );
}

export default Home;