import React, { useEffect, useState } from 'react'
import AxiosClient from '../../config/AxiosClient'
import Swal from 'sweetalert2'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import '../css/config.css'


interface Config {
    id: string
    NumeroRegistro: string
    Llave: string

}
const Config = () => {
    let navigate = useNavigate()
    //Modal Registrar
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    //Modal editar
    const [show, setShow] = useState(false);
    const handleCloseE = () => setShow(false);
    const handleShowE = () => setShow(true);
    //Lista de configuraciones para la tabla
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

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {


        AxiosClient.delete('/api/configuraciones/deleteConfig/' + e.currentTarget.value).then(res => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Eliminado éxitosamente',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                //navigate('/Config');
                window.location.href = '/Config';
            })

        }).catch(error => {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: error.status,
                text: "No se pudo eliminar",
            });
        })

    }

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        AxiosClient.get('/api/configuraciones/getConfig/' + e.currentTarget.value).then((result) => {
            setInputValues(result.data);
            handleShowE();
        })
    }

    const updateEdit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        console.log(inputValues);
        AxiosClient.put('/api/configuraciones/updateConfig/' + inputValues.id, inputValues).then(res => {

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Editado éxitosamente',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                handleCloseE();
                //navigate('/Config');
                window.location.href = '/Config';
            })
        }).catch(error => {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: error.status,
                text: "No se pudo editar",
            });

        })
    }

    return (
        <div>
            <Row>
                <Col>Nombre Persona</Col>
            </Row>
            <Row>
                <Col className='col-sm-2'>
                    <Navbar></Navbar>
                </Col>
                <Col className="col-sm-10">
                    <div className="row">
                        <div className="row">
                            <h1 className="titulo">Configuraciones</h1>
                        </div>

                        <div className="row">
                            <div className="col">
                                <Button type="button" className="insert" onClick={handleShow}>Insertar</Button>
                            </div>
                            <div className="col"></div>
                            <div className="col"></div>


                        </div>

                        <div className="row">

                            <div className="col-sm-9">
                                <table className="tableC">
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
                                                            <Button value={config.id} onClick={handleEdit} >
                                                                <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                                                            </Button>
                                                        </th>
                                                        <th>
                                                            <Button value={config.id} onClick={handleDelete} >
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
                            <div className="row"></div>
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
                                    <button> Registrar </button>
                                </form>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose} >Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                    <div>
                        <Modal show={show} onHide={handleCloseE}>
                            <Modal.Header closeButton>
                                <Modal.Title>Editar</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <form onSubmit={updateEdit}>
                                    <input className="form-control" type="text" onChange={handleChange} value={inputValues.id}
                                        name='id' disabled />
                                    <input className="form-control" type="text" onChange={handleChange} value={inputValues.NumeroRegistro}
                                        name='NumeroRegistro' placeholder='# de registros' />
                                    <input className="form-control" type="text" onChange={handleChange} value={inputValues.Llave}
                                        name='Llave' placeholder='Llave' />
                                    <button> Editar </button>
                                </form>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseE} >Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </Col>
            </Row>

            <Row>

                < Footer></Footer>

            </Row>

        </div>
    );
}

export default Config