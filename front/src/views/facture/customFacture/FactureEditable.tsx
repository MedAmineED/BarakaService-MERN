import React, { useContext, useEffect, useMemo, useState } from 'react';
import CustomFacture from './CustomFacture'; // Import your CustomFacture component
import SocieteService from '../../../ApiServices/SocieteService';
import ApiUrls from '../../../ApiUrl/ApiUrls';
import { Container } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import ServiceListModal from '../../../components/servicesListModal/ServiceListModal';
import ArticleListModal from '../../../components/ArticleListModal/ArticleListModal';
import ServiceDivers from '../../../components/serviceDivers/ServiceDivers';
import DemandeServiceListModal from '../../../components/demndeServiceModal/DemndeServiceListModal';
// import { SelectedItmsForFactureContext } from '../../../contexts/Contexts';

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

const FactureEditable: React.FC = () => {
  const [ligneFacture, setLigneFacture] = useState<LigneFacture[]>([]);

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

  const [totals, setTotals] = useState({
    subtotal: 0,
    taxTotal: 0,
    remiseTotal: 0,
    prixTTC: 0,
  });

  const addItem = () => {
    const newItem: LigneFacture = {
      reference: "Ref-" + (ligneFacture.length + 1),
      designation: "New Item",
      pu: 0,
      qte: 1,
      tva: 19,
      remise: 0,
      pht: 0,
      ptt: 0,
    };
    setLigneFacture([...ligneFacture, newItem]);
  };

  const removeItem = (index: number) => {
    setLigneFacture(ligneFacture.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, updatedItem: LigneFacture) => {
    const updatedLignes = ligneFacture.map((item, i) => (i === index ? updatedItem : item));
    console.log(updatedLignes)
    setLigneFacture(updatedLignes);
  };


  useEffect(() => {
    fetchSociete();
  },[]);

  const memoizedServiceListModal = useMemo(() => (
    <ServiceListModal
    cmpType='aa'
      resetData={()=>{}}
      onSaveItems={() => {}}
      selectedServices={[]}
    />
  ), []);

  const memoizedArticleListModal = useMemo(() => (
    <ArticleListModal
      cmpType='aa'
      resetData={()=>{}}
      onSaveItems={() => {}}
      selectedArticles={[]}
    />
  ), []);

  const memoizedCustomServiceModal = useMemo(() => (
    <ServiceDivers
      resetData={()=>{}}
      onSaveItems={() => {}}
      selectedArticles={[]}
    />
  ), []);


  const memoizedDemandeServiceModal = useMemo(() => (
    <DemandeServiceListModal
      resetData={()=>{}}
      onSaveItems={() => {}}
      selectedArticles={[]}
    />
  ), []);


  return (
    <div>
      <CustomFacture
        societe={societe}
        ligneFacture={ligneFacture}
        totals={totals}
        onAddItem={addItem}
        onRemoveItem={removeItem}
        onUpdateItem={updateItem}
      >
          <Container style={{ margin: "40px 0 20px" }}>
            <Row>
              <Col className='d-flex justify-content-start'>
                {memoizedServiceListModal}
              </Col>
              <Col className='d-flex justify-content-start'>
                {memoizedArticleListModal}
              </Col>
              <Col>
                {memoizedCustomServiceModal}
                {/* {memoizedCustomServiceModal} */}
              </Col>
              <Col>
                {memoizedDemandeServiceModal}
              </Col>
              <Col>
                {/* {memoizedCustomServiceModal} */}
              </Col>
            </Row>
          </Container>
      </CustomFacture>
    </div>
  );
};

export default FactureEditable;
