import React, { useEffect, useState } from 'react'
import AxiosClient from '../../config/AxiosClient';
import "./tableStyles.css";
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";

import Cards, { makeZip } from '../documents/Cards';


import { Link, useNavigate } from 'react-router-dom';
import { SideBarMenu } from '../shared/SideBarMenu';
import { Col } from 'react-bootstrap';



const Bloques = () => {
    const navigate = useNavigate();

    const [bloques, setBloques] = React.useState([]);
    const [selectedData, setSelectedData] = React.useState();
    const columnsD: any =
        [

            {
                name: "id",
                selector: (row: any) => row.idBloque
                ,
                sortable: true
            },
            {
                name: "Fecha Minado",
                selector: (row: any) => row.fechaMinado,
                sortable: true
            },
            {
                name: "Hash",
                selector: (row: any) => row.hash,
                sortable: true

            }
            ,
            {
                name: "milisegundos",
                selector: (row: any) => row.milisegundos,
                sortable: true
            }
            ,
            {
                name: "prueba",
                selector: (row: any) => row.prueba,
                sortable: true
            },

            {
                name: "Descargar documentos",
                selector: (row: any) => row.idBloque,
                cell: (row: any) => <button onClick={handleButtonClick} id={row.hash}>Descargar</button>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            },
            {
                name: "Ver documentos",
                selector: (row: any) => row.idBloque,
                cell: (row: any) => <button onClick={handleDocuments} id={row.hash}>Ver documentos</button>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,

            }
        ];
    useEffect(() => {

        AxiosClient.get('api/bloque/').then(res => {


            setBloques(res.data);


            //window.location.href = '/Home';
        }).catch(error => {
            console.log(error);


        })
    }, []);



    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {

        console.log(event.target.checked);
        if (event.target.checked) {


        }
    };
    const handleDocuments = (state: any) => {
        let documentes: any = bloques.filter((bloque: any) => bloque.hash === state.target.id);
        console.log(documentes);





        navigate('/card', { state: documentes[0].documentos });

    };
    const handleButtonClick = (state: any) => {
        console.log('clicked');
        console.log(state.target.id);
        let documentes: any = bloques.filter((bloque: any) => bloque.hash === state.target.id);

        makeZip(documentes[0].documentos);
        console.log(documentes[0].documentos);

    };

    return (
        <div className="container">
            <Col className='col-sm-2'>

                <SideBarMenu />

            </Col>
            <Card>
                <DataTable
                    title="Bloques"
                    columns={columnsD}
                    data={bloques}
                    defaultSortFieldId="title"
                    sortIcon={<SortIcon />}
                    pagination
                />
            </Card>
        </div>
    );

}


export default Bloques;