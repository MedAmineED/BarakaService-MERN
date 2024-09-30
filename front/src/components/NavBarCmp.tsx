import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';

const NavBarCmp: React.FC = () => {
  const navigate = useNavigate();

  const navigateTo = (path : string)=> {
       navigate(path);
  } 
  return <>
      <header id="header" className="fixed-top"> 
            <div id='navmain' className="container d-flex align-items-center justify-content-between">
              <Navbar bg="light" expand="lg">
                <Container>
                  <Navbar.Brand href="#home">
                    <h1 className='logo'>
                        <img
                          src="/images/AlBarakaServices1.png"
                          alt="Logo"
                        />
                    </h1>
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto"> {/* ms-auto: margin-start auto */}
                        <Nav.Link onClick={()=> {navigateTo("/baraka/accueil")}}>Accueil</Nav.Link>
                        <Nav.Link onClick={()=> {navigateTo("/baraka/listearticle")}}>Articles</Nav.Link>
                        <Nav.Link onClick={()=> {navigateTo("/baraka/listeservice")}}>Services</Nav.Link>
                        <Nav.Link onClick={()=> {navigateTo("/baraka/demandeservice")}}>Demande service</Nav.Link>
                        <Nav.Link onClick={()=> {navigateTo("/baraka/journalservice")}}>Journal des services</Nav.Link>
                        <Nav.Link onClick={()=> {navigateTo("/baraka/listefacture")}}>Facture</Nav.Link>
                        {/* <Nav.Link onClick={()=> {navigateTo("/baraka/listeDevis")}}>Devis</Nav.Link> */}
                        <Nav.Link onClick={()=> {navigateTo("/baraka/listeemployee")}}>Employes</Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
          </div>
    </header>
    <Outlet/>
    </>
};

export default NavBarCmp;
