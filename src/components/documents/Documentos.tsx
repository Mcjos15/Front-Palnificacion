import React, { useState } from 'react'

import Footer from '../shared/Footer'
import { Documents } from '../../interfaces/Documents';
import { Button, Col, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import AxiosClient from '../../config/AxiosClient'
import Swal from 'sweetalert2'
import { User } from '../../interfaces/User';
import { SideBarMenu } from '../shared/SideBarMenu';

const Documentos = () => {


  const [archivos, setArchivos] = React.useState<FileList | null>()
  const [documentos, setDocumentos] = useState<Array<Documents>>([])

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  //Obtiene los archivos y se ingresa al useState trato que inserten varios

  const subirArchivos = function (e: React.ChangeEvent<HTMLInputElement>) {

    const fileList = e.target.files;
    console.log(fileList);
    if (!fileList) return;
    setArchivos(fileList);

  };



  //Se supone que este inserta con el boton 
  const insertArchivos = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {

    var isDocument = true;

    var extensiones = /(.txt|.docx|.xlsx|.pptx|.pdf|.jpg|.png)$/i;
    if (archivos) {

      Array.from(archivos).forEach(archivo => {
        if (!extensiones.exec(archivo.name)) {

          isDocument = false;
          Swal.fire({
            icon: 'error',
            title: 'Extension Incorrecta',
            text: 'El documento ' + `${archivo.name}` + ' NO SE PUDO REGISTRAR',
            footer: '<a>solo extensiones .txt|.docx|.xlsx|.pptx|.pdf|.jpg|.png</a>'
          })
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(archivo);
          reader.onload = function () {

            const base64 = reader.result;


            if (localStorage.getItem("user")) {
              const data = (JSON.parse(localStorage.getItem("user")!));
              const user: User = {
                id: data.id,
                Name: data.Name,
                lastName: data.lastName,
                correo: data.correo,
                date: data.date,
                password: ''
              }

              console.log(archivo.type)
              documentos.push({
                propietario: user.id,
                name: archivo.name,
                type: archivo.type,
                dateCreation: archivo.lastModified.toString(),
                size: archivo.size.toString(),
                base64: base64
              });

              setDocumentos(documentos);



            } else {
              isDocument = false;

            }
          }

        }
      })
      if (isDocument) {

        console.log(documentos);
        AxiosClient.post('/api/documents/insertMany', documentos).then(res => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Insertado éxitosamente',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            handleClose();
            //navigate('/Config');

          })

          //window.location.href = '/Home';
        }).catch(error => {

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

    }
  }


  return (
    <div>
      <div className="row">
        <Col></Col>
      </div>
      <div className="row ">
        <Col className='col-sm-2'>

          <SideBarMenu />

        </Col>

        <Col className="col-sm-10">
          <div className="row">
            <div className="row">
              <h1 className="titulo">Documentos</h1>
            </div>

            <div className="row">
              <div className="col">
                <Button type="button" className="insert" onClick={handleShow}>Insertar</Button>
              </div>
              <div className="col"></div>
              <div className="col"></div>
            </div>

            <div className="row">
              <div className="col col-sm-9">
                {/* < Cards />  */}
              </div>

              <div className="row"></div>

              <div>
                <Modal show={showModal} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Elegir Documento</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <div>
                      <input type="file" name="files" multiple onChange={subirArchivos} />
                      <button onClick={insertArchivos} >Subir Archivos</button>
                    </div>

                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >Close</Button>
                  </Modal.Footer>
                </Modal>
              </div>

            </div>

          </div>
        </Col>

      </div>

      <div className="row">
        <Footer></Footer>
      </div>
    </div>
  );

}

export default Documentos;