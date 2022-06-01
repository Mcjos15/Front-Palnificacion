import React from 'react';
import doc from '../../assets/Image/documento.png'

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


function Card({ imageSource, title, text, url, base64, type }: any) {
    const handleClick = () => {
        if (base64 && type) {
            urltoFile(base64, title, type);
        }
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
                        : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam deserunt fuga accusantium excepturi quia, voluptates obcaecati nam in voluptas perferendis velit harum dignissimos quasi ex? Tempore repellat quo doloribus magnam."}
                </p>
                <button onClick={handleClick}>
                    Descargar documento
                </button>

            </div>
        </div>
    );
}

export default Card