import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import './facture.css';
import Societe from '../../entities/Societe';
import SocieteService from '../../ApiServices/SocieteService';
import ApiUrls from '../../ApiUrl/ApiUrls';

// interface FactureItem {
//   id: number;
//   description: string;
//   price: number;
//   quantity: number;
//   total: number;
// }

// interface FactureProps {
//   invoiceNo: string;
//   invoiceDate: string;
//   dueDate: string;
//   items: FactureItem[];
// }

const Facture: React.FC = () => {
//   const subtotal = items.reduce((sum, item) => sum + item.total, 0);
//   const tax = subtotal * 0.2;
//   const grandTotal = subtotal + tax;
  const [societe, setSociete] = useState<Societe>({
      nom: "",
      adresse: "",
      tel: "",
  })



  //get societe
  const fetchSociete = async (): Promise<void> => {
    try {
      const response = await SocieteService.GetListSociete(`${ApiUrls.SOCIETE}`);
      setSociete(response[0]);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() =>{
    fetchSociete();
  },[])

  return (
    <section id="invoice" className='p-0'>
      <Container className="">
        <Row className="py-3 align-items-center header-facture">
          {/* <Col md={12}>
            <h3 className='logo w-100 nom-societe'>
                        <img
                          width="200px"
                          height="100%"
                          className="d-inline-block align-top"
                          alt="Logo"
                          src="/images/AlBarakaServices1.png"
                        />
                          {societe.nom}
            
            </h3>
          </Col> */}
          <Col md={4}>
                <ul className="list-unstyled societe-info">
                  <li><strong>Socite :</strong> { societe.nom }</li>
                  <li><strong>Adresse :</strong> { societe.adresse }</li>
                  <li><strong>Tel :</strong> { societe.tel }</li>
                  <li><strong>Code TVA :</strong> { 7 }</li>
                  <li className='mt-2'>
                  <img
                          width="150px"
                          height="100%"
                          className="d-inline-block align-top"
                          alt="Logo"
                          src="/images/AlBarakaServices1.png"
                        />
                  </li>
                </ul>
           </Col>
          <Col md={4}>
                <ul className="list-unstyled societe-info">
                  <li><h2>Facture N° : { 1 }/2024</h2> </li>
                  <li><strong>Client :</strong> { "Med amine" }</li>
                  <li><strong>Tel :</strong> { societe.tel }</li>
                  <li><strong>Code TVA :</strong> { 7 }</li>
                </ul>
           </Col>
          <Col md={4}>
                <ul className="list-unstyled facture-info">
                  {/* <li><strong>N° Facture :</strong> { 1 }/2024</li> */}
                  <li><strong>Tunis le </strong> {"24-09-2024"}</li>
                </ul>
           </Col>
        </Row>

        <Table striped bordered className="my-5 table-auto">
          <thead>
            <tr>
              <th className='col-number'>N°</th>
              <th>Reference</th>
              <th>Désignation</th>
              <th>PU</th>
              <th>QTE</th>
              <th>TVA %</th>
              <th>Remise</th>
              <th>PHT</th>
              <th>PTT</th>
            </tr>
          </thead>
          <tbody>
              <tr key={""}>
                <th className='col-number'>{"0"}</th>
                <td>{"description"}</td>
                <td>{"price"}</td>
                <td>{"price"}</td>
                <td>{"price"}</td>
                <td>{"price"}</td>
                <td>{"price"}</td>
                <td>{"1"} DT</td>
                <td>{"500"} DT</td>
              </tr>
            <tr>
              <td colSpan={7}></td>
              <td>PHT</td>
              <td>{"10000"} DT</td>
            </tr>
            <tr>
              <td colSpan={7}></td>
              <td>TVA</td>
              <td>{"19%"}</td>
            </tr>
            <tr className='tm-col'>
                <td colSpan={7}></td>
                <td>
                    <label 
                        className='timbre-fiscal' 
                        htmlFor='itimbreFiscale'
                        >
                        Timbre Fiscale
                    </label>
                </td>
                <td>
                   <input id='itimbreFiscale' 
                         type="number" 
                         min={0}
                         value={0.455}
                         />
                    <span className='span-fiscale'> DT</span>
                </td>
            </tr>
            <tr>
              <td colSpan={7}></td>
              <td className="text-primary fs-5 fw-bold">PTT</td>
              <td className="text-primary fs-5 fw-bold">{11000} DT</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </section>
  );
};

export default Facture;