import React, { FC } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import './style.css'

const DemandeServiceHeader: FC= () => {
  return (
    <>
    <Container>
      <Row className="justify-content-between">
        <Col>
          
        </Col>
        <Col>
        <Button className="btn btn-primary custom-btn custom-btn-1">Liste des articles</Button>
        </Col>
        <Col>
          <Button className="btn btn-primary custom-btn custom-btn-1">Ajouter service</Button>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default DemandeServiceHeader
