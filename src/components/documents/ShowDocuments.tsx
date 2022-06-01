import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import AxiosClient from '../../config/AxiosClient';
import { Documents } from '../../interfaces/Documents';

function urltoFile(url: string, filename: string, mimeType: string) {

    return (fetch(url)
        .then(function (res) { return res.arrayBuffer(); })
        .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        .then((response) => {
            const url = window.URL
                  .createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
      })
    );
}
const ShowDocuments = () => {
    const url = '';

    const [documentos, setDocumentos] = React.useState<Documents | null>()
    useEffect(() => {
        AxiosClient.get('/api/documents/').then(res => {


            const value = res.data;
            console.log(value);
            for (let i = 0; i < value.length; i++) {
                console.log(value[i]);
                console.log(
                    urltoFile(value[i].Base64, value[i].name, value[i].type));
                //generaDescargablePdf(value[i].Base64, value[i].name,);

            }

            setDocumentos({
                propietario: value.id,
                name: value.name,
                type: value.type,
                //dateCreation: value.lastModified.toString(),
                //size: value.size.toString(),
                base64: value
            })



            //window.location.href = '/Home';
        }).catch(error => {


            Swal.fire({
                icon: "error",
                title: error.status,
                text: error.code,
            });
            console.log(error);


        })
    }, [])


    return (
        <div className="App">
            {<h1>React File Viewer Demo</h1>}
        </div>
    );

}

export default ShowDocuments;