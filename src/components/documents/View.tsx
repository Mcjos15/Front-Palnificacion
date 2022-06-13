import React from 'react'
import Cards from './Cards'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faDownload } from '@fortawesome/free-solid-svg-icons'
import { SideBarMenu } from '../shared/SideBarMenu';


export default function View() {
  return (
    <div>
      <div className="row ">
        <Col className='col-sm-2'>
        </Col>

        <Col className="col-sm-10">
          <div className="row">
            <div className="row">
              <h1 className="titulo">Documentos</h1>
            </div>
            <div className="row">
              <div className="col col-sm-11">
                < Cards />
              </div>
            </div>

          </div>
        </Col>

      </div>
      <div>
        <SideBarMenu />
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  )
}
