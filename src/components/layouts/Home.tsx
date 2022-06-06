import React from 'react'
import '../css/home.css'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import {
    useNavigate, Link
} from "react-router-dom";

import { SideBarMenu } from '../shared/SideBarMenu';
import { SideBarMenuCard, SideBarMenuItem } from '../../types/types';
import { FcAdvertising } from 'react-icons/fc';

import "../scss/SideBarMenu.scss"

import profile from '../../assets/Image/descarga.png'
const Home = () => {
    const navigate = useNavigate();
    const items: SideBarMenuItem[] = [
        {
            id: "1",
            label: "diel",
            icon: FcAdvertising,
            url: '/Config'
        },
        {
            id: "2",
            label: "Mc",
            icon: FcAdvertising,
            url: '/'
        },
        {
            id: "3",
            label: "obanm",
            icon: FcAdvertising,
            url: '/'
        }
    ]

    const card: SideBarMenuCard = {
        id: "card01",
        displayName: 'Mcdiel',
        title: 'UCR',
        photoUrl: profile,
        url: '/'
    }

    return (

        <><header className="bg_animate">
            <div className="header_nav">
                <div className="contenedor">
                    <h1>Bienvenido</h1>
                    <nav>
                    
                        <Link to="/Config">Config</Link>
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
        </header>
            <div>
                <SideBarMenu items={items} card={card} />
            </div>
            <div>
                <Footer></Footer>
            </div></>
    );
}

export default Home;