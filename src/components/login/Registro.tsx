import React, { useState } from 'react'
import { User } from '../../interfaces/User'
import '../css/login.css'
import Calendar from '../shared/calendar'

const Registro = () => {

  const calendar = <Calendar />

  const [inputValues, setInputValues] = useState<User>({
    name: '',
    lastName: '',
    correo: '',
    date: new Date(),

    password: ''
  })
  const [passwordValue, setPaswordValue] = useState("");

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {

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

          <input type="text" onChange={handleChange} value={inputValues.correo}
            name='correo' placeholder='Correo' />


        </div>
        {calendar}
        <div className="username">

          <input type="password" onChange={handleChange} value={inputValues.password}
            name='password' placeholder='Password' />

        </div>

        <button>
          INICIAR SESION
        </button>

      </form>
    </div>
  )
}

export default Registro;