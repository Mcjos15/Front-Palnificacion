import React, {useState} from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'

const Documentos= () => {

   /* 
   Este metodo se supone que convierte a base 64 pero hay que arreglarlo
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


    const [archivos, setArchivos]= React.useState<File>()

    //Este metodo es el que estaba probando no inserta los archivos en eln useState

    const subirArchivos = function (e: React.ChangeEvent<HTMLInputElement>){
       
       const fileList = e.target.files;
       console.log(fileList);
        if(!fileList) return;
        console.log('HOLA');
        setArchivos(fileList[0]);
        console.log(archivos);
    };
    //Se supone que este inserta con el boton 
    const insertArchivos = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>){
        if (archivos){
            const formData= new FormData();
            formData.append("Archivo", archivos, archivos.name);
            console.log(archivos.name);
        } 
        /*  for(let index = 0; index < archivos.length; index++){
             datos.append("files",archivos[index]);
         } */
       
    }


    return(
        <div>
            <div>
            {/* < Navbar></Navbar> */}
            </div>
            <div>
               <input type="file" name="files" multiple={false} onChange={subirArchivos}/>
               <button onClick={insertArchivos} >Subir Archivos</button>
            </div>
            <div>
            {/* < Footer></Footer> */}
            </div>
        </div>
    );

}

export default Documentos;