import React, { useEffect, useState } from 'react'
import AxiosClient from '../../config/AxiosClient'
import Swal from 'sweetalert2'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import {
    Link, useNavigate
} from "react-router-dom";
import { Button, Container, Row, Col, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'


interface Config {
    id: string
    NumeroRegistro: string
    Llave: string
}
const Config = () => {
    let navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

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
                //navigate('/Config');
                window.location.href = '/Config';
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

    const handleDelete = (e:React.MouseEvent<HTMLButtonElement>) => {
       const res= AxiosClient.delete('/api/configuraciones/deleteConfig/'+e.currentTarget.value).then(
             res=>res.data) 
         return  res;
    }

    const handleEdit = (e:React.MouseEvent<HTMLButtonElement>) => {

    }

    return (
        <Container>
            <Row>
                <Col>Nombre Persona</Col>
            </Row>
            <Row>
                <Col>
                    <Navbar></Navbar>
                </Col>
                <Col>
                    <div className="row">
                        <div className="col-md-2">
                            <h1 className="titulo">Configuraciones</h1>
                        </div>
                        <div className="row">
                            <Button type="button" className="insert" onClick={handleShow}>Insertar</Button>
                        </div>

                        <div className="col-md-8">

                            <table className="table table-hover">
                                <thead>
                                    <tr >
                                        <th>LLave</th>
                                        <th># registros</th>
                                        <th>Editar</th>
                                        <th>Eliminar</th>
                                    </tr>

                                </thead>

                                <tbody>
                                    {
                                        configuraciones.map(config => {
                                            return (
                                                <tr key={config.Llave} className="table-success">
                                                    <th> {config.Llave} </th>
                                                    <th> {config.NumeroRegistro} </th>
                                                    <th>
                                                        <Button value = {config.id} onClick={handleEdit} >
                                                            <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                                                        </Button>
                                                    </th>
                                                    <th>
                                                        <Button value = {config.id} onClick={handleDelete} >
                                                            <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                                                        </Button>
                                                    </th>

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>

                            </table>

                        </div>

                    </div>

                    <div>
                        <Modal show={showModal} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Formulario</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <form onSubmit={handleSubmit}>
                                    <input className="form-control" type="text" onChange={handleChange} value={inputValues.NumeroRegistro}
                                        name='NumeroRegistro' placeholder='# de registros' />
                                    <input className="form-control" type="text" onChange={handleChange} value={inputValues.Llave}
                                        name='Llave' placeholder='Llave' />
                                    <button>Registrar</button>
                                </form>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose} >Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>


                </Col>
            </Row>
            <Row>
                <Col>
                    < Footer></Footer>
                </Col>
            </Row>
        </Container>
    );
}

export default Config