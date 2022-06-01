import React from 'react';
import Card from './Card'
import doc from '../../assets/Image/documento.png'


const cards =[{
    image:doc,
    propietario: 'meli',
    name:'holi',
    type:'txt',
    dateCreation: '05/05/2022',
    size: '80gb'
}]

function Cards() {
    return (
        <div className="container d-flex justify-content-center h-100">
            <div className="row">
            {/*    {
                   cards.map(card =>{
                       <div className="col-md-4" key={card.name}>
                         <Card></Card>
                       </div>
                   })
               } */}
               </div>
        </div>
    )
}

export default Cards