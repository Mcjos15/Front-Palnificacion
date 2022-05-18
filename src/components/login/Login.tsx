import React, { useState } from 'react'
import '../css/login.css'
import axios from 'axios'

import {
  Link
} from "react-router-dom";

interface User {
  id:string
  name:string
  correo: string
  password: string
}

const Login = () => {


  const [inputValues, setInputValues] = useState<User>({
    id:'1',
    name: 'hola',
    correo: '',
    password: '',
  })

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    console.log(JSON.stringify(inputValues));  
    axios.post('http://localhost:43012/api/user/search/',inputValues).then(res =>{
      console.log(JSON.stringify(res.data));
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="formulario">

      <h1>Inicio de sesión</h1>

      <form onSubmit={handleSubmit}>

        <div className="username">

          <input type="text" onChange={handleChange} value={inputValues.correo}
            name='correo' placeholder='Correo' />


        </div>

        <div className="username">

          <input type="password" onChange={handleChange} value={inputValues.password}
            name='password' placeholder='Password' />

        </div>

        <button>
          INICIAR SESION
        </button>
        <div className="registro">
          Quiero hacer el <Link to="/Registrar">registro</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
