import React from 'react'
import Cards from './Cards'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function View() {
  return (
    <div>
    <div className="row">
      <Col></Col>
    </div>
    <div className="row ">
      <Col className='col-sm-2'>
        <Navbar></Navbar>
      </Col>

      <Col className="col-sm-10">
        <div className="row">
          <div className="row">
            <h1 className="titulo">Documentos</h1>
          </div>

          <div className="row">
            <div className="col">
             
            </div>
            <div className="col"></div>
            <div className="col"></div>
          </div>

          <div className="row">
            <div className="col col-sm-9">
               < Cards /> 
            </div>

            <div className="row"></div>

            

          </div>

        </div>
      </Col>

    </div>

    <div className="row">
      <Footer></Footer>
    </div>
  </div>
  )
}
