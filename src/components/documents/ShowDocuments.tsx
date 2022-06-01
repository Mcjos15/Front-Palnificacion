import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import AxiosClient from '../../config/AxiosClient';
import { Documents } from '../../interfaces/Documents';

function urltoFile(url: string, filename: string, mimeType: string) {
    return (fetch(url)
        .then(function (res) { return res.arrayBuffer(); })
        .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
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
                urltoFile(value[i].Base64, value[i].name, value[i].type);

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


        })
    }, [])


    return (
        <div className="App">
          {/* <h1>React File Viewer Demo</h1>
          <FileViewer fileType={type} filePath={file} onError={onError} /> */}
        </div>
    );

}

export default ShowDocuments;