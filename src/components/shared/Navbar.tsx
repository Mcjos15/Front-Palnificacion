import React from 'react'
import '../css/home.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome, faCog, faBook, faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {

    return (
        <div className="d-flex flex-column flex-shrink-0 bg-light vh-100" style={{width: "100px"}}>
            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                <li className="nav-item">
                    <a href="/Home" className="nav-link active py-3 border-bottom">
                    <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
                        <small> Home</small>
                    </a>
                </li>
                <li>
                    <a href="/Documents" className="nav-link py-3 border-bottom">
                    <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
                        <small>Documents</small>
                    </a>
                </li>
                <li>
                    <a href="/Config" className="nav-link py-3 border-bottom">
                    <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
                        <small> Settings</small>
                    </a>
                </li>
                <li>
                    <a href="/" className="nav-link py-3 border-bottom">
                    <FontAwesomeIcon icon={faArrowRightFromBracket}></FontAwesomeIcon>
                        <small> Exit</small>
                    </a>
                </li>
            </ul>
            
        </div>
    );
}

export default Navbar;