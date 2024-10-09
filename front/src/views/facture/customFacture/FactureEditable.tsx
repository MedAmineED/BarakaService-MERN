import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import CustomFacture from './CustomFacture'; // Import your CustomFacture component
import SocieteService from '../../../ApiServices/SocieteService';
import ApiUrls from '../../../ApiUrl/ApiUrls';
import { Button, Container, Col, Row } from 'react-bootstrap';
import ServiceListModal from '../../../components/servicesListModal/ServiceListModal';
import ArticleListModal from '../../../components/ArticleListModal/ArticleListModal';
import ServiceDivers from '../../../components/serviceDivers/ServiceDivers';
import DemandeServiceListModal from '../../../components/demndeServiceModal/DemndeServiceListModal';
import { SelectedItmsForFactureContext } from '../../../contexts/Contexts';
import FcatureService from '../../../ApiServices/FactureService';
import { useLocation, useNavigate } from 'react-router-dom';
import FactureService from '../../../ApiServices/FactureService';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';



const FactureEditable: React.FC = () => {
  const context = useContext(SelectedItmsForFactureContext);
  const location = useLocation();
  const { id, mode } = location.state;
  const navigate = useNavigate();
  const { createFactureFinal, factureFinal, dateFacture, getFactureById, ligneFactureList, timbreFiscale, calculateTotals, totals } = context;
  const [factNum, setFactNum] = useState<number>(0);
  const [isFactureReady, setIsFactureReady] = useState<boolean>(false);

  const [societe, setSociete] = useState({
    nom: "Your Company Name",
    adresse: "Company Address",
    tel: "000-000-0000",
  });

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
  
   
  const saveUpdates = async()=> {
    try {
      console.log(factureFinal)
      const response = await FactureService.UpdateFacture(`${ApiUrls.FACTURE}`, id, factureFinal);
      navigate('/showfact', { state : {id, mode : "show"} })
    }
    catch (err) {
      console.error('Error updating facture:', err);
    }
  }

 



  const submitFacture = async () => {
    try {
      const data = await FcatureService.AddFacture(ApiUrls.FACTURE, factureFinal);
      navigate('/baraka/listefacture')
    } catch (error) {
      console.error('Error adding facture:', error);
    } finally {
      // Reset the flag after submitting the facture
      setIsFactureReady(false);
    }
  }


  const generateInvoicePDF = async () => {
    const doc = new jsPDF();
    let yPos = 20;
    const margin = 10;
  
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
        const headerWidth = doc.internal.pageSize.getWidth() - 2 * margin;
        const headerHeight = (canvas.height / canvas.width) * headerWidth * 1;
        doc.addImage(headerImgData, 'PNG', margin, yPos, headerWidth, headerHeight);
        yPos += headerHeight + 15;
      } else {
        console.warn("Header element not found. Falling back to text-based header.");
        doc.setFontSize(8);
        doc.text(societe.nom, margin, yPos);
        doc.text(societe.adresse, margin, yPos + 4);
        doc.text(societe.tel, margin, yPos + 8);
        doc.setFontSize(10);
        doc.text(`Facture N°: ${mode === "create" ? factNum : factureFinal?.num_fact}`, doc.internal.pageSize.getWidth() / 2, yPos + 12, { align: 'center' });
        doc.text(`Client: ${"........................"}`, doc.internal.pageSize.getWidth() / 2, yPos + 16, { align: 'center' });
        doc.text(`Tel: ${"..........................."}`, doc.internal.pageSize.getWidth() / 2, yPos + 20, { align: 'center' });
        doc.setFontSize(8);
        doc.text(dateFacture, doc.internal.pageSize.getWidth() - margin - 30, yPos + 24);
        yPos += 30;
      }
    } catch (error) {
      console.error("Error capturing header:", error);
    }
  
    // Add table of products
    const tableColumn = ['N°', 'Reference', 'Désignation', 'PU', 'QTE', 'TVA %', 'Remise', 'PHT', 'PTT'];
    const tableRows = ligneFactureList.map((item, index) => [
      { content: (index + 1).toString(), styles: { halign: 'center' } },
      { content: item.reference, styles: { halign: 'left' } },
      { content: item.designation, styles: { halign: 'left' } },
      { content: item.pu.toFixed(3) + ' DT', styles: { halign: 'right' } },
      { content: item.qte.toString(), styles: { halign: 'right' } },
      { content: item.tva + '%', styles: { halign: 'right' } },
      { content: item.remise.toFixed(3) + ' DT', styles: { halign: 'right' } },
      { content: item.pht.toFixed(3) + ' DT', styles: { halign: 'right' } },
      { content: item.ptt.toFixed(3) + ' DT', styles: { halign: 'right' } }
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
        0: { halign: 'center' },
        1: { halign: 'left' },
        2: { halign: 'left' },
        3: { halign: 'right' },
        4: { halign: 'right' },
        5: { halign: 'right' },
        6: { halign: 'right' },
        7: { halign: 'right' },
        8: { halign: 'right' },
      },
      margin: { left: margin, right: margin },
    });
  
    // Add Totals at the end with border
    yPos = doc.lastAutoTable.finalY + 4;
    const totalsWidth = 50;
    const totalsHeight = 30;
    const totalsX = doc.internal.pageSize.getWidth() - margin - totalsWidth;
  
    doc.setDrawColor("#444444");
    doc.rect(totalsX, yPos, totalsWidth, totalsHeight);
  
    const totalsArray = [
      { label: "PHT", value: `${totals.montant_HT.toFixed(3)} DT` },
      { label: "TVA", value: `${totals.montant_TVA.toFixed(3)} DT` },
      { label: "Remise Total", value: `${totals.remise_total.toFixed(3)} DT` },
      { label: "Timbre Fiscal", value: `${factureFinal?.timbre_fiscal.toFixed(3)} DT` },
    ];
  
    const labelX = totalsX + 2;
    const valueX = totalsX + totalsWidth - 2;
  
    doc.setFontSize(8);
  
    totalsArray.forEach((item, index) => {
      const textYPos = yPos + 5 + index * 5;
      doc.text(item.label, labelX, textYPos);
      doc.text(item.value, valueX, textYPos, { align: 'right' });
    });
  
    doc.setFont(undefined, 'bold');
    doc.setFontSize(10);
    doc.text("PTT:", labelX, yPos + 27);
    doc.text(`${factureFinal?.prix_ttc.toFixed(3)} DT`, valueX, yPos + 27, { align: 'right' });
  
    // Add total in words
    yPos = doc.internal.pageSize.getHeight() - 30;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const totalInWords = "Arrêtée la présente facture à la somme de .....................";
    doc.text(totalInWords, doc.internal.pageSize.getWidth() / 2, yPos, { align: 'center' });
  
    // Add signature line
    yPos = doc.internal.pageSize.getHeight() - 15;
    doc.setFontSize(8);
    doc.text("Cachet & Signature", doc.internal.pageSize.getWidth() - margin - 30, yPos);
  
    const signatureLineWidth = 60;
    const signatureLineX = doc.internal.pageSize.getWidth() - margin - signatureLineWidth;
    doc.line(signatureLineX, yPos + 5, doc.internal.pageSize.getWidth() - margin, yPos + 5);
  
    // Download the PDF
    doc.save(`Facture_${mode === "create" ? factNum : factureFinal?.num_fact}.pdf`);
  };
  useEffect(() => {
    calculateTotals()
  },[ligneFactureList, timbreFiscale, dateFacture])


  useEffect(() => {
    if(mode == "create"){
      createFactureFinal({
        date_facture: dateFacture, 
        client: "", // Replace with actual client data
        id_dem: null, // Replace with actual id_dem if applicable
        num_fact: factNum.toString(),
      }); 
    }
    else if(mode == "edit") {
      createFactureFinal({
        id: id,
        date_facture: factureFinal?.date_facture, 
        client: "", // Replace with actual client data
        id_dem: null, // Replace with actual id_dem if applicable
        num_fact: factureFinal?.num_fact,
        timbre_fiscal: factureFinal?.timbre_fiscal
      }); 
    }

  },[totals])




  useEffect(() => {
    getFactureById();
    getLatestNumber();
    fetchSociete();
  }, []);

  const memoizedServiceListModal = useMemo(() => (
    <ServiceListModal
      cmpType="aa"
      resetData={() => {}}
      onSaveItems={() => {}}
      selectedServices={[]}
    />
  ), []);

  const memoizedArticleListModal = useMemo(() => (
    <ArticleListModal
      cmpType="aa"
      resetData={() => {}}
      onSaveItems={() => {}}
      selectedArticles={[]}
    />
  ), []);

  const memoizedCustomServiceModal = useMemo(() => (
    <ServiceDivers
      resetData={() => {}}
      onSaveItems={() => {}}
      selectedArticles={[]}
    />
  ), []);

  const memoizedDemandeServiceModal = useMemo(() => (
    <DemandeServiceListModal
      resetData={() => {}}
      onSaveItems={() => {}}
      selectedArticles={[]}
    />
  ), []);

  return (
    <div>
      <CustomFacture societe={societe}>
        <Container style={{ margin: '40px 0 20px' }}>
        {
          (mode == "edit" || mode == "create" )&&         
          <Row>
            <Col className="d-flex justify-content-start">{memoizedServiceListModal}</Col>
            <Col className="d-flex justify-content-start">{memoizedArticleListModal}</Col>
            <Col>{memoizedCustomServiceModal}</Col>
            <Col>{memoizedDemandeServiceModal}</Col>
          </Row>
        }
        </Container>
      </CustomFacture>

      {/* Prepare facture on button click */}
      {
        (mode == "create") ?
         <Button disabled={ligneFactureList.length == 0} onClick={submitFacture}>
           Enregistrer la facture
         </Button> 
         :
        (mode == "edit") ?
        <div className='d-flex justify-content-center gap-3'>
           <Button className='btn-secondary' onClick={()=> {navigate('/showfact', { state : {id, mode : "show"} })}}>
           Annuler
         </Button> 
         <Button disabled={ligneFactureList.length == 0}  className='btn-success' onClick={saveUpdates}>
           Enregistrer les modifications
         </Button> 
        </div>
         :
         !factureFinal?.id_dem?
         <div className='d-flex justify-content-center gap-3'>
          <Button 
              onClick={()=> { navigate('/editfact', { state : {id, mode : "edit"} }) }}
              >
                Modifier la facture
          </Button>
          <Button 
              onClick={()=> { generateInvoicePDF() }}
              >
                Telecharger PDF
          </Button>
        </div>
        : ""
      }
    </div>
  );
};

export default FactureEditable;
