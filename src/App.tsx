import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';
import Registro from './components/login/Registro';
import Home from './components/layouts/Home';
import Configuracion from './components/configuracionesSistema/Config'
import Documents from './components/documents/Documentos'

import { BrowserRouter, Routes, Route } from "react-router-dom";




function App() {
  return (

    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Registrar" element={<Registro/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Config" element={<Configuracion/>}/>
        <Route path="/Documents" element={<Documents/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
