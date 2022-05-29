import React, { useState } from 'react'
import { User } from '../../interfaces/User'
import '../css/login.css'
import Swal from 'sweetalert2'
import AxiosClient from '../../config/AxiosClient';
import {
  useNavigate
} from "react-router-dom";
const Registro = () => {

  

  const navigate = useNavigate();
  const [passwordValue, setPasswordValue] = useState("");


  const [inputValues, setInputValues] = useState<User>({
    Name: '',
    lastName: '',
    correo: '',
    date: '',

    password: ''
  })


  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (inputValues.password !== passwordValue) {
      return alert('Contraseñas no coiciden');

    } else {
      AxiosClient.post('/api/user/', inputValues)
        .catch(error => {
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
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login exitoso',
        showConfirmButton: false,
        timer: 1000
      }).then(() => {

        navigate("../");
      })

    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })

  }
  return (

    <div className='formulario'>
      <h1>Registro de usuario</h1>

      <form onSubmit={handleSubmit}>

        <div className="username">
          <input type="text" onChange={handleChange} value={inputValues.Name}
            name='Name' placeholder='Nombre' required />
          <input type="text" onChange={handleChange} value={inputValues.lastName}
            name='lastName' placeholder='Apellido' required />
          <input type="date" onChange={handleChange} value={inputValues.date}
            name='date' placeholder='Fecha de nacimiento' required />

          <input type="text" onChange={handleChange} value={inputValues.correo}
            name='correo' placeholder='Correo' required />


        </div>
        <div className="username">

          <input type="password" onChange={handleChange} value={inputValues.password}
            name='password' placeholder='Password' required />
          <input type="password" onChange={event => setPasswordValue(event.target.value)}
            name='PasswordVerify' placeholder='Verify password' required />

        </div>

        <button>
          Registrar
        </button>

      </form>
    </div>
  )
}

export default Registro;