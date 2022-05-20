import React, { useEffect, useState } from 'react'
import AxiosClient from '../../config/AxiosClient'
import Swal from 'sweetalert2'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import {
    Link, useNavigate
} from "react-router-dom";
import '../css/config.css'


interface Config {
    id: string
    NumeroRegistro: string
    Llave: string
}
const Config = () => {
    let navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)

    const [configuraciones, setConfiguraciones] = useState<Array<Config>>([])

    const [inputValues, setInputValues] = useState<Config>({
        id: '',
        NumeroRegistro: '',
        Llave: ''
    })

    useEffect(() => {
        AxiosClient.get('/api/configuraciones/getAllConfig/').then((result) => {
            console.log(result.data)
            setConfiguraciones(result.data)
            //console.log(configuraciones)
        })
    }, [])

    const toggleModal = () => {
        setShowModal(showModal => !showModal)
    }



    const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        AxiosClient.post('/api/configuraciones/addConfig/', inputValues).then(res => {
           
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Registrado éxitosamente',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                setShowModal(showModal => !showModal)
                navigate('/0config');
            })
        }).catch(error => {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: error.status,
                text: "No se pudo registrar",
            });

        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div id="main-container">

            <div className='container'>

            </div>

            <div className="row">
                <div className="col-md-2">
                    <h1>Configuraciones</h1>
                </div>
                <div className="row">
                </div>

                <div className="col-md-8">
                    <button type="button" className="insert" onClick={toggleModal}>Insertar</button>
                    <table className="table table-hover">
                        <thead>
                            <tr >
                                <th>LLave</th>
                                <th>Número de registros</th>
                            </tr>

                        </thead>

                        <tbody>
                            {
                                configuraciones.map(config => {
                                    return (
                                        <tr key={config.Llave} className="table-success">
                                            <th> {config.Llave} </th>
                                            <th> {config.NumeroRegistro} </th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>

                </div>
                <div className="col-md-2"></div>
            </div>
            {showModal ?
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Formulario</h4>
                    <form onSubmit={handleSubmit}>
                        <input className="form-control" type="text" onChange={handleChange} value={inputValues.NumeroRegistro}
                            name='NumeroRegistro' placeholder='# de registros' />
                        <input className="form-control" type="text" onChange={handleChange} value={inputValues.Llave}
                            name='Llave' placeholder='Llave' />
                        <button>
                            Ingresar
                        </button>

                    </form>
                </div>
                : <></>
            }
            <div className="footer">
                < Footer></Footer>
            </div>

        </div>
    );
}

export default Config