import React, { useState } from 'react'
import '../css/login.css'

import AxiosClient from '../../config/AxiosClient'
import Swal from 'sweetalert2'
import {
  Link, useNavigate
} from "react-router-dom";


import { User } from '../../interfaces/User';


const Login = () => {
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState<User>({

    Name: '',
    lastName: '',
    correo: '',
    date: '',
    password: '',
  })

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();





    AxiosClient.post('/api/user/search/', inputValues).then(res => {
      //console.log(JSON.stringify(res));
      navigate("home");
      //window.location.href = '/Home';
    }).catch(error => {
      console.log(error);

      if (error.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          title: error.status,
          text: "No hay conexión con el server",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: error.status,
          text: error.code,
        });
      }

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
