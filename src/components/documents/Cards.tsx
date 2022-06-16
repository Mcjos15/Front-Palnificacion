import React, { useEffect, useState } from 'react';
import Card from './Card';
import doc from '../../assets/Image/documento.png'
import AxiosClient from '../../config/AxiosClient';
import { Documents } from '../../interfaces/Documents';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faDownload } from '@fortawesome/free-solid-svg-icons'
import '../../components/css/cards.css'


interface Card {
    id?: string,
    image: string,
    propietario: string,
    name: string,
    type: string,
    dateCreation: string,
    size: string,
    base64: string,
}


const cardData: Card[] = [];

//Lista de documentos elegidos
const idDocuments: string[] = [];

function Cards() {
    const [cards, setCards] = useState<Array<Card>>([]);
    const [render, setRender] = useState(0);

    const [checked, setCheck] = useState(false);
    const changeNumber = () => {
        if (setRender) {

            setRender(render + 1);
        }
    }


    const getDocuments = async () => {

        await AxiosClient.get('/api/documents/').then(res => {


            const value = res.data;

            const propietarioLS = (JSON.parse(localStorage.getItem("user")!));


            for (let i = 0; i < value.length; i++) {
                console.log(value[i]);

                if (propietarioLS) {
                    cardData.push({
                        id: value[i].id,
                        image: doc,
                        propietario: propietarioLS!.Name,
                        name: value[i].name,
                        type: value[i].type,
                        dateCreation: value[i].dateCreation,
                        size: value[i].size,
                        base64: value[i].Base64,

                    });
                } else {
                    console.log("No sirve");
                }


            }
            setCards(cardData);

        }).catch(error => {


            Swal.fire({
                icon: "error",
                title: error.status,
                text: error.code,
            });
            console.log(error);

        })
    }
    useEffect(() => {

        getDocuments();


    }, [])

    //Pasa id de hijo a padre si select es true lo guarda si no busca el id en los guardados y elimina si
    //quitaron el select
    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.checked);
        if (e.currentTarget.checked) {
            idDocuments.push(e.currentTarget.value);
            if (idDocuments.length > 1) {
                setCheck(true);
            }
        } else {
            let pos = idDocuments.indexOf(e.currentTarget.value); //Agarra la posicion del que quitaron el select
            if (pos != null) {
                idDocuments.splice(pos, 1); //elimina
                if (idDocuments.length <= 1){
                    setCheck(false);
                }
            }
        }

    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(idDocuments);
    }

    const handleDownloads = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(idDocuments);
    }

    return (
        <div >
            {checked ? (
                <div className="row">
                    <div className="col-sm-4">
                        <button onClick={handleDelete}  >
                            <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                        </button>
                    </div>
                    <div className="col-sm-4">
                        <button onClick={handleDownloads} >
                            <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
                        </button>
                    </div>
                </div>
            ) : (<div> </div>)}

            <div className="row">
                {
                    cards.map((card: Card) => {
                        return (
                            <div className="col-md-4" key={card.id}>

                                <Card imageSource={card.image} title={card.name} text={'peso: ' + card.size + '\n Nombre del propietario ' + card.propietario}
                                    base64={card.base64} type={card.type} id={card.id} setRender={setRender} render={render} handleSelect={handleSelect}></Card>
                                <br></br>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Cards