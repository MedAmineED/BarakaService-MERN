import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { z } from 'zod';
import { demandeServiceSchema } from '../../util/validationSchema';
import MainCmp from '../../components/MainCmp';
import ItemHeader from '../../components/itemHeader/ItemHeader';
import DemandeServiceTable from './demandeServiceTable/DemandeServiceTable';
import ServiceListModal from './servicesListModal/ServiceListModal';
import ArticleListModal from './ArticleListModal/ArticleListModal';
import { useDemandeService } from '../../customHooks/useDemandeService';
import DemandeServiceService from '../../ApiServices/DemandeServiceService';
import ApiUrls from '../../ApiUrl/ApiUrls';
import DemandeServiceEntity from '../../entities/DemandeServiceEntity';
import CustomModal from '../../components/customModal/CustomModal';
import CustomInput from '../../components/customInput/CustomInput';
import './style.css';
import CustomDevModal from '../../devComponents/CustomDevModal';


const columns = [
  { header: 'N°', accessor: 'index' },
  { header: 'libelle', accessor: 'designation' },
  { header: 'prix unitaire', accessor: 'prix' },
  { header: 'quantite', accessor: 'quantite' },
  { header: 'prix HT', accessor: 'prix' },
  { header: 'remise U', accessor: 'remise' },
  { header: 'tax', accessor: 'tax' },
  { header: 'tax total', accessor: 'tax_total' },
  { header: 'prix TTC', accessor: 'prix_TTC' },
];

const initialFormData: DemandeServiceEntity = {
  matricule: '',
  marque: '',
  conducteur: '',
  client: '',
  bon_commande: '',
  employer: '',
  heure_deb: '',
  heure_fin: '',
  payer: 0,
  prix_ttc: 0,
  lignedemande: [],
};

const DemandeService: FC = () => {
  const { servicesState, articlesState, ligneDemandeArr, handleItemChange, reset } = useDemandeService();
  const [formData, setFormData] = useState<DemandeServiceEntity>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentLigneDemande, setCurrentLigneDemande] = useState<DemandeServiceEntity['lignedemande']>([]);

  const getPrixTTC = useCallback((prixTTC: number) => {
    setFormData((prevData) => ({ ...prevData, prix_ttc: prixTTC }));
  }, []);

  const validateForm = useCallback(() => {
    try {
      demandeServiceSchema.parse(formData);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((issue) => {
          fieldErrors[issue.path[0]] = issue.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  }, [formData]);

  const addDemandeService = useCallback(async () => {
    console.log(validateForm())
    console.log(errors)
    console.log(formData)
    if (!validateForm()) return;

    try {
      const data = await DemandeServiceService.AddDemandeService(ApiUrls.DEMANDE_SERVICE, formData);
      setFormData(initialFormData);
      reset();
      console.log("demande service added successfully", data);
    } catch (error) {
      console.error('Error adding demande service:', error);
    }
  }, [formData, validateForm, reset]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  }, []);

    // Update formData when ligneDemandeArr changes
    useEffect(() => {
      setCurrentLigneDemande(ligneDemandeArr);
    }, [ligneDemandeArr]);
  
    useEffect(() => {
      setFormData((prevData) => ({
        ...prevData,
        lignedemande: currentLigneDemande,
      }));
    }, [currentLigneDemande]);

    useEffect(()=> {
      alert("Remarque\n\nCette section est en cours de développement et n'est pas encore terminée. Des éléments doivent encore être corrigés");
    },[])

  const vehiculeSection = useMemo(() => (
    <div className="section">
      <div className="section-title inputs-sec-title">Véhicule</div>
      <div className="inline-inputs">
        <Form.Group controlId="matricule" className="mb-2 input-container">
          <Form.Label>Matricule</Form.Label>
          <Form.Control 
            type="text" 
            size="sm" 
            placeholder="Saisir Matricule" 
            value={formData.matricule} 
            onChange={handleChange}
            isInvalid={!!errors.matricule} 
          />
          <Form.Control.Feedback type="invalid">
            {errors.matricule}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="marque" className="mb-2 input-container">
          <Form.Label>Marque</Form.Label>
          <Form.Control 
            type="text" 
            size="sm" 
            placeholder="Saisir Marque" 
            value={formData.marque} 
            onChange={handleChange}
            isInvalid={!!errors.marque} 
          />
          <Form.Control.Feedback type="invalid">
            {errors.marque}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <Form.Group controlId="conducteur" className="mb-2">
        <Form.Label>Conducteur</Form.Label>
        <Form.Control 
          type="text" 
          size="sm" 
          placeholder="Saisir Conducteur" 
          value={formData.conducteur} 
          onChange={handleChange}
          isInvalid={!!errors.conducteur} 
        />
        <Form.Control.Feedback type="invalid">
          {errors.conducteur}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  ), [formData.matricule, formData.marque, formData.conducteur, handleChange, errors]);

  const clientSection = useMemo(() => (
    <div className="section">
      <div className="section-title inputs-sec-title">Client</div>
      <div className="inline-inputs">
        <Form.Group controlId="client" className="mb-2 input-container">
          <Form.Label>Nom du Client</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Saisir Nom du Client"
            value={formData.client}
            onChange={handleChange}
            isInvalid={!!errors.client}
          />
          <Form.Control.Feedback type="invalid">
            {errors.client}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="bon_commande" className="mb-2 input-container">
          <Form.Label>N° Bon de Commande</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Saisir N° Bon de Commande"
            value={formData.bon_commande}
            onChange={handleChange}
            isInvalid={!!errors.bon_commande}
          />
          <Form.Control.Feedback type="invalid">
            {errors.bon_commande}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
    </div>
  ), [formData.client, formData.bon_commande, handleChange, errors.client, errors.bon_commande]);
  

  const employeeSection = useMemo(() => (
    <div className="section">
      <div className="section-title inputs-sec-title">Employé</div>
      <div className="inline-inputs">
        <Form.Group controlId="employer" className="mb-2 input-container">
          <Form.Label>Employé</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Saisir Employé"
            value={formData.employer}
            onChange={handleChange}
            isInvalid={!!errors.employer}
          />
          <Form.Control.Feedback type="invalid">
            {errors.employer}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="heure_deb" className="mb-2 input-container">
          <Form.Label>Heure Début</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Saisir Heure Début"
            value={formData.heure_deb}
            onChange={handleChange}
            isInvalid={!!errors.heure_deb}
          />
          <Form.Control.Feedback type="invalid">
            {errors.heure_deb}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="heure_fin" className="mb-2 input-container">
          <Form.Label>Heure Fin</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Saisir Heure Fin"
            value={formData.heure_fin}
            onChange={handleChange}
            isInvalid={!!errors.heure_fin}
          />
          <Form.Control.Feedback type="invalid">
            {errors.heure_fin}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
    </div>
  ), [formData.employer, formData.heure_deb, formData.heure_fin, handleChange, errors.employer, errors.heure_deb, errors.heure_fin]);

  const memoizedServiceListModal = useMemo(() => (
    <ServiceListModal
      resetData={reset}
      onSaveItems={() => {}}
      checkAction={handleItemChange}
      selectedServices={servicesState}
    />
  ), [reset, handleItemChange, servicesState]);

  const memoizedArticleListModal = useMemo(() => (
    <ArticleListModal
      resetData={reset}
      onSaveItems={() => {}}
      checkAction={handleItemChange}
      selectedArticles={articlesState}
    />
  ), [reset, handleItemChange, articlesState]);

  const memoizedCustomServiceModal = useMemo(() => (
    <CustomModal 
        title={'Ajouter Service'} 
        textButton={'Ajouter service'} 
        onSave={() =>{}}
    >
      <div className="d-flex justify-content-center gap-3 align-items-center flex-column">
          <CustomInput
            label="Nom Service"
            id="nom-service"
            placeholder="nom servcice..."
            value={""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{ console.log(e.target.value);}}
          />
          <CustomInput
            label="Prix Service"
            id="prix-service"
            type='number'
            min={0}
            value={0}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{ console.log(e.target.value);}}
          />
      </div>
    </CustomModal>
  ), [reset, handleItemChange, articlesState]);

  return (
    <MainCmp>
      <ItemHeader title="Demande service" buttonText="Ajouter Employé" onButtonClick={() => {}} />
      <Container fluid className="full-height-container">
        <Row className="mt-4 full-height-row global-container-dmn">
          <Col xs={12} md={5} className="full-height-col demande-data-inp">
            <Form name="frmArticle" className="compact-form">
              {vehiculeSection}
              <hr className="section-divider" />
              {clientSection}
              <hr className="section-divider" />
              {employeeSection}
              <hr className="section-divider" />
            </Form>
          </Col>
          <Col xs={12} md={7} className="full-height-col result-demande">
            <div className="content dmn-srv-content-section">
              <div className="mb-4">
                <Container>
                  <Row className="justify-content-between">
                    <Col>
                      {memoizedServiceListModal}
                    </Col>
                    <Col>
                      {memoizedArticleListModal}
                    </Col>
                    <Col>
                      {memoizedCustomServiceModal}
                    </Col>
                  </Row>
                </Container>
              </div>
              <DemandeServiceTable
                srv={ligneDemandeArr}
                data={ligneDemandeArr}
                columns={columns}
                onDelete={(id: number) => handleItemChange(false, { id } as ServiceEntity | Article)}
                getPrixTTC={getPrixTTC}
              />
              <Row className="mt-3">
                <Col className="text-end">
                  <Button variant="secondary" className="me-2 custom-btn custom-btn-reset" onClick={reset}>Réinitialiser</Button>
                  <Button variant="primary" className="custom-btn custom-btn-save" onClick={()=> {addDemandeService()}}>Enregistrer</Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        
      </Container>
    </MainCmp>
  );
};

export default DemandeService;
