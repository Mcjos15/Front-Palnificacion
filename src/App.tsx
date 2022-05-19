import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';
import Registro from './components/login/Registro';
import Home from './components/layouts/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Registrar" element={<Registro/>}/>
        <Route path="/Home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
