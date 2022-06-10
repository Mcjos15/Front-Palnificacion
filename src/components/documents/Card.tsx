import React from 'react';
import Swal from 'sweetalert2';
import doc from '../../assets/Image/documento.png'
import AxiosClient from '../../config/AxiosClient';
import { render } from '@testing-library/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faDownload } from '@fortawesome/free-solid-svg-icons'
import '../../components/css/cards.css'
import { ReadableByteStreamController } from 'stream/web';
import  PropTypes from 'prop-types'

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


function Card({ imageSource, id, title, text, url, base64, type, setRender, render, handleSelect }: any,
    ) {
    const handleClick = () => {
        if (base64 && type) {
            urltoFile(base64, title, type);
        }
    }

    const changeNumber = () => {
        if (setRender && render) {

            setRender(render + 1);
        }
    }

    const deleteCard = async () => {
        console.log(id);
        await AxiosClient.delete('/api/documents/delete/' + id, { data: { id: id } }).then(res => {
            console.log(res);
            if (setRender) {

                changeNumber();
            }
        }).catch(error => {
            Swal.fire({
                icon: "error",
                title: error.status,
                text: error.code,
            })

        });

    }


    return (
        <div className="card text-center bg-dark animate__animated animate__fadeInUp">
            <div className="overflow">
                <img src={imageSource} alt="a wallpaper" className="card-img-top" />
            </div>
            <div className="card-body text-light">
                <h4 className="card-title">{title}</h4>
                <p className="card-text text-secondary">
                    {text
                        ? text
                        : " Sin información."}
                </p>
                <div className="row">
                    <div className="col btns">
                        <input type="checkbox" value= {id}  onChange= {handleSelect}  />

                    </div>
                    <div className="col btns">
                        <button onClick={handleClick} className="btn-card">
                            <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
                        </button>

                    </div>
                    <div className="col btns">
                        <button onClick={deleteCard} className="btn-card">
                            <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Card