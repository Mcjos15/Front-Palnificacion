import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { Documents } from '../../interfaces/Documents';
import { ListGroupItemProps } from 'react-bootstrap';


import AxiosClient from '../../config/AxiosClient'
import Swal from 'sweetalert2'
import { User } from '../../interfaces/User';

const Documentos = () => {


  const [archivos, setArchivos] = React.useState<FileList | null>()

  const [documentos, setDocumentos] = React.useState<Documents | null>()

  //Obtiene los archivos y se ingresa al useState trato que inserten varios

  const subirArchivos = function (e: React.ChangeEvent<HTMLInputElement>) {

    const fileList = e.target.files;
    console.log(fileList);
    if (!fileList) return;
    setArchivos(fileList);

  };



  //Se supone que este inserta con el boton 
  const insertArchivos = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {

    if (archivos) {

      Array.from(archivos).forEach(archivo => {
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
            setDocumentos({
              propietario: user.id,
              name: archivo.name,
              type: archivo.type,
              dateCreation: archivo.lastModified.toString(),
              size: archivo.size.toString(),
              base64: base64
            });

            console.log(documentos)
            AxiosClient.post('/api/documents/', documentos).then(res => {

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

          } else {

          }

          //Axios
          /* */
        }


      })
    }
  }


  return (
    <div>
      <div>
        {/* < Navbar></Navbar> */}
      </div>
      <div>
        <input type="file" name="files" multiple onChange={subirArchivos} />
        <button onClick={insertArchivos} >Subir Archivos</button>
      </div>
      <div>
        {/* < Footer></Footer> */}
      </div>
    </div>
  );

}

export default Documentos;