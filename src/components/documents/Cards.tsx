import React, { useEffect, useState } from 'react';
import Card from './Card';
import doc from '../../assets/Image/documento.png'
import spinner from '../../assets/Image/1.gif'
import AxiosClient from '../../config/AxiosClient';
import { Documents } from '../../interfaces/Documents';
import { Button, Col, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faDownload, faBoxes } from '@fortawesome/free-solid-svg-icons'
import '../../components/css/cards.css'
import { saveAs } from 'file-saver';
import JSZip from 'jszip';



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
let cardDataZip: Card[] = [];


//Lista de documentos elegidos
const idDocuments: string[] = [];
//funcion que devueleve un array con los cards que coinciden con el id del segundo array ingresado
const arrayWithCards = (vectId: string[], vectCards: Array<Card>) => {
    let carData: Card[] = [];
    for (let i = 0; i < vectCards.length; i++) {
        if (vectCards[i].id) {

            if (vectId.includes(vectCards[i].id!)) {
                carData.push(vectCards[i]);

            }
        }


    }

    return carData;

}

function Cards() {
    const [cards, setCards] = useState<Array<Card>>([]);
    const [render, setRender] = useState(0);
    const [documentos, setDocumentos] = useState<Array<Documents>>([])

    const [refresh, setRefresh] = useState(false);


    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const [checked, setCheck] = useState(false);

    const [posts, setPosts] = useState([]);


    const getDocuments = async () => {


        await AxiosClient.get('/api/documents/').then(res => {
            console.log("llamo");


            const value = res.data;

            const propietarioLS = (JSON.parse(localStorage.getItem("user")!));


            for (let i = 0; i < value.length; i++) {


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

                }


            }
            setCards(cardData);

        }).catch(error => {


            Swal.fire({
                icon: "error",
                title: error.status,
                text: error.code,
            });

        })
    }
    useEffect(() => {

        cards.splice(0, cards.length);
        setCards([]);
        getDocuments();

    }, [refresh])



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
                if (idDocuments.length <= 1) {
                    setCheck(false);
                }
            }
        }

    }


    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (idDocuments.length > 0) {

            let carData: Card[] = arrayWithCards(idDocuments, cards);

            for (let i = 0; i < carData.length; i++) {

                documentos.push({
                    id: carData[i].id,
                    propietario: carData[i].propietario,
                    name: carData[i].name,
                    type: carData[i].type,
                    dateCreation: carData[i].dateCreation.toString(),
                    size: carData[i].size.toString(),
                    base64: carData[i].base64
                })



            }

            setDocumentos(documentos);


            AxiosClient.post('/api/documents/deleteMany', documentos).then(res => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'borrado éxitosamente',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    handleClose();
                    //navigate('/Config');
                    setDocumentos([]);
                    setRefresh(!refresh);




                })
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

    const handleMining = (e: React.MouseEvent<HTMLButtonElement>)=>{
        loadPost(); 
    }

    const loadPost = async () => {
        //Hasta que obtenga respuesta se muestra el cargando
        
        handleShow();
        //llamada a base de datos
        const response = await AxiosClient.get('/api/documents/mining');
        //recibe respuesta
        setPosts(response.data);
      
        // Deja de mostrar el cargando
        handleClose();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Los documentos han sido minados',
            showConfirmButton: false,
            timer: 1500
          })

          setRefresh(!refresh);
         
    }
    const handleDownloads = (e: React.MouseEvent<HTMLButtonElement>) => {
        var zip = new JSZip();
        if (idDocuments.length >= 2) {

            for (let i = 0; i < cards.length; i++) {
                if (cards[i].id) {

                    if (idDocuments.includes(cards[i].id!)) {
                        cardDataZip.push(cards[i]);

                    }
                }


            }

            cardDataZip.map(arr => {
                zip.file(arr.name, arr.base64.split(',')[1], { base64: true });

            });

            zip.generateAsync({ type: 'blob' }).then(function (contend) {
                saveAs(contend, 'Documentos.zip');
            });
            zip = new JSZip();
            cardDataZip = [];

        } else {
            //aca se pone la accion que se debe de hacer en ca
        }
    }

    return (
        <div >
            <div className="row">
                <div className="col-sm-4">
                    <button onClick={handleMining}  >
                        <FontAwesomeIcon icon={faBoxes}></FontAwesomeIcon>
                    </button>
                </div>
                <div className="col-sm-4">
                    {checked ? (
                        <button onClick={handleDelete}  >
                            <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                        </button>
                    ) : (<div> </div>)}
                </div>
                <div className="col-sm-4">
                    {checked ? (
                        <button onClick={handleDownloads} >
                            <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
                        </button>
                    ) : (<div> </div>)}
                </div>
            </div>
            <div className="row">
                {
                    cards.map((card: Card) => {
                        return (
                            <div className="col-md-4" key={card.id}>

                                <Card imageSource={card.image} title={card.name} text={'peso: ' + card.size + '\n Nombre del propietario ' + card.propietario}
                                    base64={card.base64} type={card.type} id={card.id} setRender={setRender}
                                    render={render} handleSelect={handleSelect} refresh={refresh} setRefresh={setRefresh}></Card>
                                <br></br>
                            </div>
                        )
                    })
                }
            </div>

            <div>
                <Modal show={showModal} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Minando Archivos</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div>
                      <h1>Minando...</h1>
                      <img src={spinner} width={150} height={150}/>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
        </div>
    );
}

export default Cards;