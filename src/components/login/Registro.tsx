import React, { useState } from 'react'
import { User } from '../../interfaces/User'
import '../css/login.css'

const Registro = () => {


  const [passwordValue, setPasswordValue] = useState("");

  const [inputValues, setInputValues] = useState<User>({
    name: '',
    lastName: '',
    correo: '',
    date: '',

    password: ''
  })


  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {

    if (inputValues.password !== passwordValue) {
      return alert('Contraseñas no coiciden');

    } else {

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
          <input type="text" onChange={handleChange} value={inputValues.name}
            name='name' placeholder='Nombre' required />
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