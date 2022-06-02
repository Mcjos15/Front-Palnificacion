import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';
import Registro from './components/login/Registro';
import Home from './components/layouts/Home';
import Configuracion from './components/configuracionesSistema/Config'
import Documents from './components/documents/Documentos'
import ViewDocuments from './components/documents/View'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowDocuments from './components/documents/ShowDocuments';
import Cards from './components/documents/Cards';




function App() {
  return (

    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Registrar" element={<Registro/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Config" element={<Configuracion/>}/>
        <Route path="/Documents" element={<Documents/>}/>
        <Route path="/card" element={<Cards/>}/>
        <Route path="/ViewDocument" element={<ViewDocuments/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
