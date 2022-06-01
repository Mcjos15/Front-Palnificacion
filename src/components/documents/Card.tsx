import React from 'react';
import doc from '../../assets/Image/documento.png'

function Card(){
    return(
        <div className="card text-center ">
            <img src={doc} alt="" />
            <div className="card-body">
                <h4 className="card-title">Mi titulo</h4>
            </div>


        </div>
    )
}

export default Card