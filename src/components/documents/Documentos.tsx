import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'


interface Documents {
    lastModified: number,
    lastModifiedDate: Date,
    name: string
    size: number
    type: string
    webkitRelativePath: string
}

const Documentos = () => {

    /* 
    Este metodo no lo uso saco pedazos para convertir a base 64
    const convertir =(archivos:Blob)=> {
        console.log(archivos);
        Array.from(archivos).forEach(archivo=> {
            var reader = new FileReader();
            reader.readAsDataURL(archivo);
            reader.onload = function() {
               // var arrayAux =[];
                const base64= reader.result;
                console.log(base64);
                //arrayAux = base64.split(',');
                //console.log(arrayAux[1]);
            }
        })
     } */


    const [archivos, setArchivos] = React.useState <Array<File>>([])

    //Obtiene los archivos y se ingresa al useState trato que inserten varios

    const subirArchivos = function (e: React.ChangeEvent<HTMLInputElement>) {

        const  fileList  = e.target.files;
        console.log(fileList);
        if (!fileList) return;
        Array.from(fileList).forEach(file => console.log("Do something with " + file.name));
        
       // setArchivos(fileList);

    };
    //Se supone que este inserta con el boton 
    const insertArchivos = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        console.log(archivos);
        /* if (archivos) {
            const formData = new FormData();
            formData.append("Archivo", archivos, archivos.name);
            console.log(formData);

            const reader = new FileReader();
            reader.readAsDataURL(archivos);
            reader.onload = function () {
                var arrayAux = [];
                const base64 = reader.result;
                console.log(base64);


                //console.log(arrayAux[1]);
            } */

        //}
        /*  for(let index = 0; index < archivos.length; index++){
             datos.append("files",archivos[index]);
         } */

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