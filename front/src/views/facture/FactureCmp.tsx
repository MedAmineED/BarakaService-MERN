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
import FcatureService from '../../ApiServices/FactureService';
import LigneFacture from '../../entities/LigneFacture';



const FactureCmp: React.FC = () => {
  const location = useLocation();
  const { demandeService, timbreFiscal, facture } = location.state;
  const [totals, setTotals] = useState({
    subtotal: 0,
    taxTotal: 0,
    remiseTotal: 0,
    isRunned : false,
  });
  const [societe, setSociete] = useState<Societe>({
    nom: "",
    adresse: "",
    tel: ""
  });
  const [factureState, setFactureState] = useState<Facture | null>();
  const [factNum, setFactNum] = useState<number>(0);


  const fetchSociete = async (): Promise<void> => {
    try {
      const response = await SocieteService.GetListSociete(`${ApiUrls.SOCIETE}`);
      setSociete(response[0]);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const getLatestNumber = async (): Promise<void> => {
    try {
      const response = await FcatureService.getLatestNumber(`${ApiUrls.FACTURE}`);
      setFactNum(response + 1);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  //--- create new facture ----
  const createFacture = async (newFct: Facture) => {
    try {
          const fetchedFacture = await FcatureService.GetFactureByIdDem(ApiUrls.FACTURE, demandeService.id_dem);
          if(!fetchedFacture){
               const data = await FcatureService.AddFacture(ApiUrls.FACTURE, newFct);
          } else {
            setFactureState(fetchedFacture)
          }
    } catch (error) {
      console.error('Error adding facture service:', error);
    }
  };

  

  useEffect(() => {
    // Fetch Societe and Latest Facture Number
    const initData = async () => {
      await fetchSociete();
      await getLatestNumber();
    };
  
    initData();
  
    // Calculate totals only once when `demandeService` is available
    if (demandeService && !totals.isRunned) {
      const subtotal = parseFloat((demandeService.ligneDemandes)
        .reduce((sum, item) => sum + (item.prix * item.quantite), 0).toFixed(3));
      const remiseTotal = parseFloat((demandeService.ligneDemandes)
        .reduce((sum, item) => sum + (item.remise * item.quantite), 0).toFixed(3));
      const taxTotal = parseFloat((demandeService.ligneDemandes)
        .reduce((sum, item) => sum + (item.prix * (item.tva / 100) * item.quantite), 0).toFixed(3));
  
        console.log('totals is created ')
      setTotals({
        subtotal,
        remiseTotal,
        taxTotal,
        isRunned: true,
      });
    }
  
    // Create Facture only if it doesn't exist and totals are updated
    if (!facture && totals.isRunned && !factureState) {
      const now = new Date();
      const localDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  
      const newFacture: Facture = {
        date_facture: localDate.split('T')[0],
        client: demandeService.client,
        id_dem: demandeService.id_dem,
        pht: totals.subtotal,
        tax: totals.taxTotal,
        remise_total: totals.remiseTotal,
        timbre_fiscal: timbreFiscal,
        prix_ttc: demandeService.prix_ttc,
        ligneFacture: demandeService.ligneDemandes.map((ligne: LigneDemande) => ({
          reference: ligne.reference,
          designation: ligne.designation,
          pu: ligne.prix,
          qte: ligne.quantite,
          tva: ligne.tva,
          remise: parseFloat((ligne.remise * ligne.quantite).toFixed(3)),
          pht: parseFloat((ligne.prix * ligne.quantite).toFixed(3)),
          ptt: parseFloat((ligne.prix * ligne.quantite * (1 + (ligne.tva / 100)) - (ligne.remise * ligne.quantite)).toFixed(3))
        })),
      };
  
      setFactureState(newFacture);
    }else if(facture){
      setFactureState(facture);
    }

  
    // Check if facture needs to be created
    if (!facture && factureState) {
      createFacture(factureState);
    }
  }, [demandeService, facture, factureState, totals.isRunned]);
  


  
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
        doc.text(factureState?.date_facture, doc.internal.pageSize.getWidth() - margin - 30, yPos + 24);
        yPos += 30;
      }
    } catch (error) {
      console.error("Error capturing header:", error);
      // Fallback to text-based header (same as in the else block above)
    }
  
    // Add table of products (unchanged)
    const tableColumn = ['N°', 'Reference', 'Désignation', 'PU', 'QTE', 'TVA %', 'Remise', 'PHT', 'PTT'];
  const tableRows = factureState?.ligneFacture.map((fct, index) => [
    { content: (index + 1).toString(), styles: { halign: 'center' } },
    { content: fct.reference, styles: { halign: 'left' } },
    { content: fct.designation, styles: { halign: 'left' } },
    { content: fct.pu.toFixed(3) + ' DT', styles: { halign: 'right' } },
    { content: fct.qte.toString(), styles: { halign: 'right' } },
    { content: fct.tva + '%', styles: { halign: 'right' } },
    { content: fct.remise.toFixed(3) + ' DT', styles: { halign: 'right' } },
    { content: fct.pht.toFixed(3) + ' DT', styles: { halign: 'right' } },
    { content: fct.ptt.toFixed(3) + ' DT', styles: { halign: 'right' } }
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
      fillColor: "#c01635",
      textColor: "#ffffff",
      fontStyle: 'bold',
      halign: 'center',
    },
    columnStyles: {
      0: { halign: 'center' },  // N°
      1: { halign: 'left' },    // Reference
      2: { halign: 'left' },    // Désignation
      3: { halign: 'right' },   // PU
      4: { halign: 'right' },   // QTE
      5: { halign: 'right' },   // TVA %
      6: { halign: 'right' },   // Remise
      7: { halign: 'right' },   // PHT
      8: { halign: 'right' },   // PTT
    },
    margin: { left: margin, right: margin },
  });
  
// Add Totals at the end with border
yPos = doc.lastAutoTable.finalY + 4;
const totalsWidth = 50; // You can adjust this value
const totalsHeight = 30; // You can adjust this value
const totalsX = doc.internal.pageSize.getWidth() - margin - totalsWidth;

// Draw border around totals
doc.setDrawColor("#444444");
doc.rect(totalsX, yPos, totalsWidth, totalsHeight);

// Define an array of totals and their labels for easy processing
const totalsArray = [
  { label: "PHT", value: `${totals.subtotal.toFixed(3)} DT` },
  { label: "TAX", value: `${totals.taxTotal} DT` },
  { label: "Remise Total", value: `${totals.remiseTotal.toFixed(3)} DT` },
  { label: "Timbre Fiscal", value: `${timbreFiscal} DT` },
];

// Define the X positions for labels and values
const labelX = totalsX + 2; // You can adjust this value
const valueX = totalsX + totalsWidth - 2; // You can adjust this value

// Add total texts with aligned values
doc.setFontSize(8);

totalsArray.forEach((item, index) => {
  const textYPos = yPos + 5 + index * 5;
  doc.text(item.label, labelX, textYPos); // Left-align text
  doc.text(item.value, valueX, textYPos, { align: 'right' }); // Right-align value
});

// Add bold text for the total amount (PTT)
doc.setFont(undefined, 'bold');
doc.setFontSize(10);
doc.text("PTT:", labelX, yPos + 27);
doc.text(`${demandeService.prix_ttc} DT`, valueX, yPos + 27, { align: 'right' });
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
        <Row id= {'fc-header'}  className="py-3 align-items-center header-facture">
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
            <ul  className="list-unstyled d-flex flex-column client-info w-100 align-items-center">
              <div style={{width: 'fit-content'}}>
                <li style={{textAlign: "start"}}><h4>Facture N° : {factureState?.num_fact? factureState?.num_fact : 
                                       factNum + "/" + (factureState?.date_facture+"").split('T')[0].split('-')[0]
                                      }</h4></li>
                <li style={{textAlign: "start"}}><strong>Client :</strong> {demandeService.client? demandeService.client :  "........................"}</li>
                <li style={{textAlign: "start"}}><strong>Tel :</strong> {"............................."}</li>
                <li style={{textAlign: "start"}}><strong>Adresse :</strong> {"..................."}</li>
              </div>
            </ul>
          </Col>
          <Col md={4}>
            <ul className="list-unstyled facture-info">
              <li><strong>Tunis le </strong> {((factureState?.date_facture + "").split(' ')[0]).split('T')[0].split('-').reverse().reduce((cr, nxt)=>cr+"/"+nxt)}</li>
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
                  <td className='col-number has-letter'>{index + 1}</td>
                  <td className="last-column has-letter">{ligneFct.reference}</td>
                  <td className="last-column has-letter">{ligneFct.designation}</td>
                  <td className="last-column has-number">{ligneFct.pu?.toFixed(3)} DT</td>
                  <td className="last-column has-number">{ligneFct.qte}</td>
                  <td className="last-column has-number">{ligneFct.tva}%</td>
                  <td className="last-column has-number">{ligneFct.remise?.toFixed(3)} DT</td>
                  <td className="last-column has-number">{ligneFct.pht?.toFixed(3)} DT</td>
                  <td className="last-column has-number">{(ligneFct.ptt?.toFixed(3))} DT</td>
                </tr>
              ))}
            </tbody>
          <tfoot className="tfoot-small">
            <tr>
              <td colSpan={7}></td>
              <td  style={{textAlign: "start"}}>PHT</td>
              <td>{(totals.subtotal).toFixed(3)} DT</td>
            </tr>
            <tr>
              <td colSpan={7}></td>
              <td  style={{textAlign: "start"}}>TVA</td>
              <td>{totals.taxTotal} DT</td>
            </tr>
            <tr>
              <td colSpan={7}></td>
              <td  style={{textAlign: "start"}}>Remise Total</td>
              <td>{(totals.remiseTotal).toFixed(3)} DT</td>
            </tr>
            <tr>
              <td colSpan={7}></td>
              <td  style={{textAlign: "start"}}>Timbre Fiscale</td>
              <td>{timbreFiscal} DT</td>
            </tr>
            <tr>
              <td colSpan={7}></td>
              <td className="border text-primary fs-5 fw-bold"  style={{textAlign: "start"}}>PTT</td>
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
