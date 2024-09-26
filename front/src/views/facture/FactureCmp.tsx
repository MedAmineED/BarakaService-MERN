import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import './facture.css';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Societe from '../../entities/Societe';
import SocieteService from '../../ApiServices/SocieteService';
import ApiUrls from '../../ApiUrl/ApiUrls';
import { useLocation } from 'react-router-dom';
import LigneDemande from '../../entities/LigneDemande';
import Facture from '../../entities/Facture';
import FcatureService from '../../ApiServices/FcatureService';
import LigneFacture from '../../entities/LigneFacture';

const FactureCmp: React.FC = () => {
  const location = useLocation();
  const { demandeService, timbreFiscal, facture } = location.state;
  const [totals, setTotals] = useState({
    subtotal: 0,
    taxTotal: 0,
    remiseTotal: 0
  });
  const [societe, setSociete] = useState<Societe>({
    nom: "",
    adresse: "",
    tel: ""
  });
  const [factureState, setFactureState] = useState<Facture | null>();

  const fetchSociete = async (): Promise<void> => {
    try {
      const response = await SocieteService.GetListSociete(`${ApiUrls.SOCIETE}`);
      setSociete(response[0]);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  //--- creta new facture ----
  const createFacture = async (newFct: Facture) => {
    try {
          const fetchedFacture = await FcatureService.GetFactureByIdDem(ApiUrls.FACTURE, demandeService.id_dem);
          if(!fetchedFacture){
               const data = await FcatureService.AddFacture(ApiUrls.FACTURE, newFct);
               console.log("facture service added successfully", data);
          } else {
               console.log("facture service already exists");
          }
    } catch (error) {
      console.error('Error adding facture service:', error);
    }
  };
  

  

  useEffect(() => {
    if (demandeService) {
      setTotals({
        subtotal: (demandeService.ligneDemandes).reduce((sum, item) => sum + (item.prix * item.quantite), 0),
        remiseTotal: (demandeService.ligneDemandes).reduce((sum, item) => sum + (item.remise * item.quantite), 0),
        taxTotal: parseFloat(((demandeService.ligneDemandes).reduce((sum, item) => sum + (item.prix * (item.tva / 100) * item.quantite), 0)).toFixed(3)),
      });
    }

    fetchSociete();
    if(facture){
      setFactureState(facture);
    }else {
      const newFacture: Facture = {
        date_facture: new Date().toISOString().split('T')[0], 
        client: demandeService.client, 
        id_dem: demandeService.id_dem,
        pht: totals.subtotal, 
        tax: totals.taxTotal, 
        remise_total: totals.remiseTotal, 
        timbre_fiscal: timbreFiscal,
        prix_ttc: demandeService.prix_ttc, 
        ligneFacture: demandeService.ligneDemandes.map((ligne: LigneDemande) => {
          return {
            reference: ligne.reference,
            designation: ligne.designation,
            pu: ligne.prix,
            qte: ligne.quantite,
            tva: ligne.tva,
            remise: parseFloat((ligne.remise * ligne.quantite).toFixed(3)),
            pht: parseFloat((ligne.prix * ligne.quantite).toFixed(3)),
            ptt: parseFloat((ligne.prix * ligne.quantite * (1 + (ligne.tva / 100)) - (ligne.remise * ligne.quantite)).toFixed(3))
           }})
      }
      //--- generate facture
      setFactureState(newFacture)
    }
  }, []);

  useEffect(() => {
    if(!facture && factureState){
      createFacture(factureState);
    }
  }, [factureState]);


  
  const generateInvoicePDF = async () => {
    const doc = new jsPDF();
    let yPos = 20; // Increased starting Y position for more top margin
    const margin = 10; // Margin for sides
  
    try {
      // Attempt to capture the header using html2canvas
      const headerElement = document.getElementById('fc-header');
      if (headerElement) {
        const canvas = await html2canvas(headerElement, {
          scale: 1.5,
          backgroundColor: '#fff',
          useCORS: true,
        });
        const headerImgData = canvas.toDataURL('image/png');
        // Reduce width and height of the header image
        const headerWidth = doc.internal.pageSize.getWidth() - 2 * margin;
        const headerHeight = (canvas.height / canvas.width) * headerWidth * 1;
        doc.addImage(headerImgData, 'PNG', margin, yPos, headerWidth, headerHeight);
        yPos += headerHeight + 15; // Add some space after the header
      } else {
        console.warn("Header element not found. Falling back to text-based header.");
        // Fallback to text-based header with smaller font size
        doc.setFontSize(8); // Even smaller font size for header
        doc.text(societe.nom, margin, yPos);
        doc.text(societe.adresse, margin, yPos + 4);
        doc.text(societe.tel, margin, yPos + 8);
        doc.setFontSize(10);
        doc.text('Facture N°: 1/2024', doc.internal.pageSize.getWidth() / 2, yPos + 12, { align: 'center' });
        doc.text(`Client: ${"..........."}`, doc.internal.pageSize.getWidth() / 2, yPos + 16, { align: 'center' });
        doc.text(`Tel: ${"..........."}`, doc.internal.pageSize.getWidth() / 2, yPos + 20, { align: 'center' });
        doc.setFontSize(8);
        doc.text('Tunis le 24-09-2024', doc.internal.pageSize.getWidth() - margin - 30, yPos + 24);
        yPos += 30;
      }
    } catch (error) {
      console.error("Error capturing header:", error);
      // Fallback to text-based header (same as in the else block above)
    }
  
    // Add table of products (unchanged)
    const tableColumn = ['N°', 'Reference', 'Désignation', 'PU', 'QTE', 'TVA %', 'Remise', 'PHT', 'PTT'];
    const tableRows = factureState?.ligneFacture.map((fct, index) => [
      index + 1,
      fct.reference,
      fct.designation,
      fct.pu.toFixed(3) + ' DT',
      fct.qte,
      fct.tva + '%',
      (fct.remise).toFixed(3) + ' DT',
      (fct.pht).toFixed(3) + ' DT',
      (fct.ptt).toFixed(3) + ' DT'
    ]);
  
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: yPos,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: "#c01635", // Light gray background for header
        textColor: "#ffffff", // Black text for header
        fontStyle: 'bold',
      },
      margin: { left: margin, right: margin },
    });
  
    // Add Totals at the end with border
    yPos = doc.lastAutoTable.finalY + 4;
    const totalsWidth = 40;
    const totalsHeight = 30;
    const totalsX = doc.internal.pageSize.getWidth() - margin - totalsWidth;
    
    doc.setDrawColor("#444444");

    // Draw border around totals
    doc.rect(totalsX, yPos, totalsWidth, totalsHeight);
  
    // Add total texts
    doc.setFontSize(8);
    doc.text(`PHT: ${totals.subtotal.toFixed(3)} DT`, totalsX + 2, yPos + 5);
    doc.text(`TAX: ${totals.taxTotal} DT`, totalsX + 2, yPos + 10);
    doc.text(`Remise Total: ${totals.remiseTotal.toFixed(3)} DT`, totalsX + 2, yPos + 15);
    doc.text(`Timbre Fiscal: ${timbreFiscal} DT`, totalsX + 2, yPos + 20);
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text(`PTT: ${demandeService.prix_ttc} DT`, totalsX + 2, yPos + 27);
  
    // Add total in words
    yPos = doc.internal.pageSize.getHeight() - 30; // Position for the total in words
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const totalInWords = "Arrêtée la présente facture à la somme de .....................";
    doc.text(totalInWords, doc.internal.pageSize.getWidth() / 2, yPos, { align: 'center' });

    // Add signature line
    yPos = doc.internal.pageSize.getHeight() - 15; // Position for the signature line
    doc.setFontSize(8);
    doc.text("Cachet & Signature", doc.internal.pageSize.getWidth() - margin - 30, yPos);
    
    // Add a line for the signature
    const signatureLineWidth = 60;
    const signatureLineX = doc.internal.pageSize.getWidth() - margin - signatureLineWidth;
    doc.line(signatureLineX, yPos + 5, doc.internal.pageSize.getWidth() - margin, yPos + 5);

    // Download the PDF
    doc.save(`Facture_${1}_2024.pdf`);
  };

  return (
    <>
    <section id="invoice" className='p-0'>
      <Container className="">
        <Row id= {'fc-header'} className="py-3 align-items-center header-facture">
          <Col md={4}>
            <ul className="list-unstyled societe-info">
              <li><strong>Socite :</strong> {societe.nom}</li>
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
            <ul className="list-unstyled client-info">
              <li><h4>Facture N° : {1}/2024</h4></li>
              <li><strong>Client :</strong> {demandeService.client? demandeService.client : ".............."}</li>
              <li><strong>Tel :</strong> {"................"}</li>
            </ul>
          </Col>
          <Col md={4}>
            <ul className="list-unstyled facture-info">
              <li><strong>Tunis le </strong> {((factureState?.date_facture + "").split(' ')[0]).split('-').reverse().reduce((cr, nx)=>( cr + "-" + nx))}</li>
            </ul>
          </Col>
        </Row>

        <Table striped bordered className="my-5 table-auto facture-table">
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
                <th className="last-column">PTT</th>
              </tr>
            </thead>
            <tbody>
              {factureState?.ligneFacture?.map((ligneFct: LigneFacture, index: number) => (
                <tr key={ligneFct.id} className={`row-${index % 2 === 0 ? 'even' : 'odd'}`}>
                  <td className='col-number'>{index + 1}</td>
                  <td className="last-column">{ligneFct.reference}</td>
                  <td className="last-column">{ligneFct.designation}</td>
                  <td className="last-column">{ligneFct.pu} DT</td>
                  <td className="last-column">{ligneFct.qte}</td>
                  <td className="last-column">{ligneFct.tva}%</td>
                  <td className="last-column">{(ligneFct.remise).toFixed(3)} DT</td>
                  <td className="last-column">{ligneFct.pht} DT</td>
                  <td className="last-column">{(ligneFct.ptt)} DT</td>
                </tr>
              ))}
            </tbody>
          <tfoot className="tfoot-small">
            <tr>
              <td colSpan={7}></td>
              <td>PHT</td>
              <td>{(totals.subtotal).toFixed(3)} DT</td>
            </tr>
            <tr>
              <td colSpan={7}></td>
              <td>TAX</td>
              <td>{totals.taxTotal} DT</td>
            </tr>
            <tr>
              <td colSpan={7}></td>
              <td>RemiseToal</td>
              <td>{(totals.remiseTotal).toFixed(3)} DT</td>
            </tr>
            <tr className='tm-col'>
              <td colSpan={7}></td>
              <td>Timbre Fiscale</td>
              <td>{timbreFiscal} DT</td>
            </tr>
            <tr>
              <td colSpan={7}></td>
              <td className="border text-primary fs-5 fw-bold">PTT</td>
              <td className="border text-primary fs-5 fw-bold">{demandeService.prix_ttc} DT</td>
            </tr>
          </tfoot>
        </Table>
      </Container>
    </section>
        <Button onClick={generateInvoicePDF} variant="primary">Telecharger PDF</Button>
    </>
  );
};

export default FactureCmp;
