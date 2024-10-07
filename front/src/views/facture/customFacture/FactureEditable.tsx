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
      console.log("factureFinal mel update ")
      console.log(factureFinal)
      const response = await FactureService.UpdateFacture(`${ApiUrls.FACTURE}`, id, factureFinal);
      console.log("Facture updated successfully", response);
    }
    catch (err) {
      console.error('Error updating facture:', err);
    }
  }

 
  const prepareFacture = () => {
    console.log("dateFacture")
    console.log(dateFacture)
    // Prepare the facture but don't submit it yet
    createFactureFinal({
      date_facture: dateFacture, 
      client: "", // Replace with actual client data
      id_dem: null, // Replace with actual id_dem if applicable
      num_fact: factNum.toString(),
    }); 
    // Set flag to indicate facture is ready for submission
    setIsFactureReady(true);
  };


  const submitFacture = async () => {
    try {
      const data = await FcatureService.AddFacture(ApiUrls.FACTURE, factureFinal);
      console.log("Facture added successfully", data);
    } catch (error) {
      console.error('Error adding facture:', error);
    } finally {
      // Reset the flag after submitting the facture
      setIsFactureReady(false);
    }
  }

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
      }); 
    }

  },[totals])




  useEffect(() => {
    console.log("idddddddddd ", id)
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
         <Button onClick={submitFacture}>
           Enregistrer la facture
         </Button> 
         :
        (mode == "edit") ?
        <div className='d-flex justify-content-center gap-3'>
           <Button className='btn-secondary' onClick={()=> {navigate('/showfact', { state : {id, mode : "show"} })}}>
           Annuler
         </Button> 
         <Button  className='btn-success' onClick={saveUpdates}>
           Enregistrer les modifications
         </Button> 
        </div>
         :
        <Button 
            onClick={()=> { navigate('/editfact', { state : {id, mode : "edit"} }) }}
         >
              Modifier la facture
        </Button>
      }
      
    </div>
  );
};

export default FactureEditable;
