import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Table, Button, FormControl } from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import ServiceListModal from '../../../components/servicesListModal/ServiceListModal';
import ArticleListModal from '../../../components/ArticleListModal/ArticleListModal';
import { SelectedItmsForFactureContext } from '../../../contexts/Contexts';
import './customFact.css'
import { useLocation } from 'react-router-dom';
import FactureService from '../../../ApiServices/FactureService';
import ApiUrls from '../../../ApiUrl/ApiUrls';

interface LigneFacture {
  reference: string;
  designation: string;
  pu: number;
  qte: number;
  tva: number;
  remise: number;
  pht: number;
  ptt: number;
}

interface FactureCmpProps {
  societe: {
    nom: string;
    adresse: string;
    tel: string;
  };

  // totals : {
  //   montant_HT: number,
  //   remise_total: number,
  //   montant_TVA: number,
  //   montant_TTC: number,
  // },
  children: React.ReactNode;
}

const FactureCmp: React.FC<FactureCmpProps> = ({ societe, children }) => {
  const location = useLocation();
  const { id, mode } = location.state;
  const [factNum, setFactNum] = useState<string | null>();
  const context = useContext(SelectedItmsForFactureContext);
  const  { 
            ligneFactureList, 
            removeItemSelectXbutton,
            calculateTotals, 
            totals,
            updateItem, 
            timbreFiscale, 
            setTimbreFiscale,
            dateFacture,
            setDateFacture,
            factureFinal
          } = context;
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<LigneFacture | null>(null);


  const getLatestNumber = async (): Promise<void> => {
    try {
      const response = await FactureService.getLatestNumber(`${ApiUrls.FACTURE}`);
      const year = new Date().getFullYear();
      setFactNum((response + 1) + "/"  + year);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };


  
  const handleEditClick = (index: number, item: LigneFacture) => {
    console.log(item)
    setEditIndex(index);
    setEditedItem({ ...item });
  };


 


  const handleSaveClick = (index: number) => {
    if (editedItem) {
      updateItem(index, editedItem);
    }
    setEditIndex(null);
    setEditedItem(null);
  };

  const handleCancelClick = () => {
    setEditIndex(null);
    setEditedItem(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof LigneFacture) => {
    if (editedItem) {
      setEditedItem({
        ...editedItem,
        [field]: field === 'pu' || field === 'qte' || field === 'tva' || field === 'remise' || field === 'pht' || field === 'ptt' ? parseFloat(e.target.value) : e.target.value,
      });
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    console.log(e.target.value);
    // const date = new Date(e.target.value);
    // const dateString = date.toISOString().split('T')[0];
    setDateFacture(e.target.value);
  }

  useEffect(()=> {
    getLatestNumber();
  }, [])
  
  useEffect(()=>{
    console.log("runned")
    calculateTotals();
    console.log(ligneFactureList)
    if(mode != "create" && factureFinal){
      console.log(factureFinal.date_facture)
      const dateObject = factureFinal.date_facture.split('T')[0];
      setDateFacture(dateObject)
    }
  }, [ ligneFactureList, timbreFiscale])


  return (
    <section id="invoice" className='p-0'>
      <Container>
      <Row id= {'fc-header'} className="py-3 align-items-center header-facture">
          <Col md={4}>
            <ul className="list-unstyled societe-info">
              <li><strong>Societe :</strong> {societe.nom}</li>
              <li><strong>Adresse :</strong> {societe.adresse}</li>
              <li><strong>Tel :</strong> {societe.tel}</li>
              <li><strong>Code TVA :</strong> {}</li>
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
            <ul className="list-unstyled d-flex flex-column client-info w-100 align-items-center">
              <div style={{width: 'fit-content'}}>
                <li style={{textAlign: "start"}}><h4>Facture N° : {mode == "create"? factNum : factureFinal?.num_fact}</h4></li>
                <li style={{textAlign: "start"}}><strong>Client :</strong> { "........................"}</li>
                <li style={{textAlign: "start"}}><strong>Tel :</strong> {"............................."}</li>
                <li style={{textAlign: "start"}}><strong>Adresse :</strong> {"..................."}</li>
             </div>
            </ul>
          </Col>
          <Col md={4}>
            <ul className="list-unstyled facture-info">
              <li><strong>Tunis le </strong><input 
                                                className='facture-date'
                                                value={dateFacture} 
                                                onChange={(e)=> {handleDateChange(e)}} 
                                                type='date' 
                                                style={{color: "black", textAlign : "end",
                                                  border: "none",
                                                  outline: "none",
                                                }}
                                                disabled = {mode != "create"? true: false}
                                                /> 
              { 
              // "24-05-2024"
              // ((factureState?.date_facture + "").split(' ')[0]).split('T')[0].split('-').reverse().reduce((cr, nxt)=>cr+"-"+nxt)
              }</li>
            </ul>
          </Col>
        </Row>
        {
          children
        }
        <Table striped bordered  className="my-5 table-auto facture-table">
          <thead>
            <tr>
              <th  className='col-number'>N°</th>
              <th>Reference</th>
              <th>Désignation</th>
              <th>PU</th>
              <th>QTE</th>
              <th>TVA %</th>
              <th>Remise</th>
              <th>PHT</th>
              <th>PTT</th>
             {mode !== "show" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {ligneFactureList?.map((item, index) => (
              <tr key={index}>
                <td className='col-number has-letter'>{index + 1}</td>
                <td  className="last-column has-letter">{item.reference}</td>
                <td  className="last-column has-letter">{item.designation}</td>
                {editIndex === index ? (
                  <>
                    <td><FormControl className="last-column has-number" type="number" min={0} value={editedItem?.pu} onChange={(e) => handleInputChange(e, 'pu')} /></td>
                    <td><FormControl className="last-column has-number" type="number" min={1} value={editedItem?.qte} onChange={(e) => handleInputChange(e, 'qte')} /></td>
                    <td><FormControl className="last-column has-number" type="number" min={0} value={editedItem?.tva} onChange={(e) => handleInputChange(e, 'tva')} /></td>
                    <td><FormControl className="last-column has-number" type="number" min={0} value={editedItem?.remise} onChange={(e) => handleInputChange(e, 'remise')} /></td>
                    <td className="last-column has-number">{item.pht}</td>
                    <td className="last-column has-number">{item.ptt}</td>
                    {mode !== "show" && <td>
                      <Button variant="success" onClick={() => handleSaveClick(index)}>Enregistrer</Button>
                      <Button variant="secondary" onClick={handleCancelClick}>Annuler</Button>
                    </td>}
                  </>
                ) : (
                  <>
                    <td className="last-column has-number">{item.pu.toFixed(3)} DT</td>
                    <td className="last-column has-number">{item.qte}</td>
                    <td className="last-column has-number">{item.tva}%</td>
                    <td className="last-column has-number">{item.remise.toFixed(3)} DT</td>
                    <td className="last-column has-number">{item.pht.toFixed(3)} DT</td>
                    <td className="last-column has-number">{item.ptt.toFixed(3)} DT</td>
                    {mode !== "show" && <td className='d-flex justify-content-around align-itmes-center w-100'>
                        <button type="button" 
                                 onClick={()=>{handleEditClick(index, item)}} 
                                 className={`btn action-btn btn-sm btn-primary`}>
                            <i className="bi bi-pencil-square"></i>
                        </button>
                        <button type="button" 
                                 onClick={()=>{removeItemSelectXbutton(item)}}
                                 className={`btn action-btn btn-sm btn-danger`}>
                            <i className={"bi bi-x-square"}></i>
                        </button>
                    </td>}
                  </>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot  className="tfoot-small">
            <tr>
              <td colSpan={mode !== "show"? 8 : 7}></td>
              <td style={{textAlign: "start"}}>PHT</td>
              <td style={{textAlign: "end"}}>{(totals.montant_HT).toFixed(3)} DT</td>
            </tr>
            <tr>
              <td colSpan={mode !== "show"? 8 : 7}></td>
              <td style={{textAlign: "start"}}>TVA</td>
              <td style={{textAlign: "end"}}>{totals.montant_TVA} DT</td>
            </tr>
            <tr>
              <td colSpan={mode !== "show"? 8 : 7}></td>
              <td style={{textAlign: "start"}}>Remise Total</td>
              <td style={{textAlign: "end"}} >{(totals.remise_total).toFixed(3)} DT</td>
            </tr>
            <tr>
              <td colSpan={mode !== "show"? 8 : 7}></td>
              <td style={{textAlign: "start"}}>Timbre Fiscale</td>
              <td style={{textAlign: "end"}} className={mode == "create"? 'd-flex justify-content-around g-2 align-items-center': ""}>
                   { mode == "create"? <FormControl 
                            style={{width: "100px", textAlign: "end"}} 
                            type="number" 
                            min={0}
                            value={timbreFiscale || 0} 
                            onChange={(e) => {setTimbreFiscale(parseFloat(e.target.value));}} 
                            /> 
                            :
                            0.000.toFixed(3)
              }
                    DT
              </td>
            </tr>
            <tr>
              <td colSpan={mode !== "show"? 8 : 7}></td>
              <td className="border text-primary fs-5 fw-bold" style={{textAlign: "start"}}>PTT</td>
              <td className="border text-primary fs-5 fw-bold" style={{textAlign: "end"}} >{totals.montant_TTC} DT</td>
            </tr>
          </tfoot>
        </Table>
        {/* <Button variant="primary" onClick={onAddItem}>Add Item</Button> */}
      </Container>
    </section>
  );
};

export default FactureCmp;
