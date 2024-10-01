import React, { useContext, useEffect, useMemo, useState } from 'react';
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
import Facture from '../../../entities/Facture';

const FactureEditable: React.FC = () => {
  const context = useContext(SelectedItmsForFactureContext);
  const { createFactureFinal, factureFinal, dateFacture } = context;
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

  const prepareFacture = () => {
    // Prepare the facture but don't submit it yet
    createFactureFinal({
      date_facture: dateFacture || new Date(), 
      client: "", // Replace with actual client data
      id_dem: null, // Replace with actual id_dem if applicable
      num_fact: factNum.toString(),
    });

    // Set flag to indicate facture is ready for submission
    setIsFactureReady(true);
  };

  // This effect will run when factureFinal is updated and the facture is ready
  useEffect(() => {
    console.log("factureFinal : ")
    console.log(factureFinal)
    if (isFactureReady && factureFinal) {
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
      };
      submitFacture();
    }
  }, [factureFinal, isFactureReady]);

  useEffect(() => {
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
          <Row>
            <Col className="d-flex justify-content-start">{memoizedServiceListModal}</Col>
            <Col className="d-flex justify-content-start">{memoizedArticleListModal}</Col>
            <Col>{memoizedCustomServiceModal}</Col>
            <Col>{memoizedDemandeServiceModal}</Col>
          </Row>
        </Container>
      </CustomFacture>

      {/* Prepare facture on button click */}
      <Button onClick={prepareFacture}>Enregistrer la facture</Button>
    </div>
  );
};

export default FactureEditable;
