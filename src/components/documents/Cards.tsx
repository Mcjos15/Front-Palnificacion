import React, { useEffect, useState } from 'react';
import Card from './Card';
import doc from '../../assets/Image/documento.png'
import AxiosClient from '../../config/AxiosClient';
import { Documents } from '../../interfaces/Documents';
import Swal from 'sweetalert2';

interface Card {
    id?:string,
    image: string,
    propietario: string,
    name: string,
    type: string,
    dateCreation: string,
    size: string,
    base64:string
}


const cardData: Card[] = [];

function Cards() {
    const [cards, setCards] = useState<Array<Card>>([])
    const [documentos, setDocumentos] = React.useState<Documents | null>()
    useEffect(() => {


        AxiosClient.get('/api/documents/').then(res => {


            const value = res.data;
            console.log(value);
            for (let i = 0; i < value.length; i++) {
                console.log(value[i]);
                cardData.push({
                    id: value[i].id,
                    image: doc,
                    propietario: value[i].propietario,
                    name: value[i].name,
                    type: value[i].type,
                    dateCreation: value[i].dateCreation,
                    size: value[i].size,
                    base64:value[i].Base64
                });

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
    }, [])
    return (
        <div className="container d-flex justify-content-center h-100">
            <div className="row">
                {
                    cards.map((card: Card) => {
                        return (
                            <div className="col-md-4" key={card.id}>

                                <Card imageSource={card.image} title={card.name} text={card.size+' '+card.propietario}
                                base64={card.base64} type={card.type}></Card>
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