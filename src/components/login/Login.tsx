import React, { useState } from 'react'
import '../css/login.css'
import axios from 'axios'

<<<<<<< Updated upstream
import {
  Link
} from "react-router-dom";

interface User {
=======
interface User{
  id:string
  name:string
>>>>>>> Stashed changes
  correo: string
  password: string
}

const Login = () => {

<<<<<<< Updated upstream
  const [inputValues, setInputValues] = useState<User>({
=======
  const [inputValues, setInputValues] = useState <User>({
    id:'1',
    name: 'hola',
>>>>>>> Stashed changes
    correo: '',
    password: '',
  })

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

<<<<<<< Updated upstream
    console.log(JSON.stringify(inputValues));
    let user: User = {
      correo: inputValues.correo,
      password: inputValues.password
    }

    axios.post('http://localhost:43012/api/user/search/', { correo: inputValues.correo, password: inputValues.password }).then(res => {
=======
        
    axios.post('http://localhost:43012/api/user/search/',inputValues).then(res =>{
>>>>>>> Stashed changes
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
