import React from 'react'
import '../css/home.css'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'

const Home = () => {

    return (
        <div>
            <Navbar></Navbar>
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
            < Footer></Footer>
        </div>
    );
}

export default Home;