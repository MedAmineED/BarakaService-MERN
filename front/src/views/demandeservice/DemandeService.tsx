import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { z } from 'zod';
import { demandeServiceSchema } from '../../util/validationSchema';
import MainCmp from '../../components/MainCmp';
import ItemHeader from '../../components/itemHeader/ItemHeader';
import DemandeServiceTable from './demandeServiceTable/DemandeServiceTable';
import ServiceListModal from './servicesListModal/ServiceListModal';
import ArticleListModal from './ArticleListModal/ArticleListModal';
import DemandeServiceService from '../../ApiServices/DemandeServiceService';
import ApiUrls from '../../ApiUrl/ApiUrls';
import DemandeServiceEntity from '../../entities/DemandeServiceEntity';
import CustomModal from '../../components/customModal/CustomModal';
import CustomInput from '../../components/customInput/CustomInput';
import './style.css';
import VehiculeForm from './vehiculeForm/VehiculeForm';
import ClientForm from './clientForm/ClientForm';
import EmployeeForm from './employeeForm/EmployeeForm';
import { SelectedItmsContext } from '../../contexts/Contexts';
import CustomService from './customService/CustomService';



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



/**
 * allItems
 * 
 * article |
 *         |========> item
 * service |
 * 
 * ligneService
 * kol checkbox <===== item
 *         |
 *         |========> transform item to ligneService
 * 
 * 
 * 
 */





const DemandeService: FC = () => {

  const context = useContext(SelectedItmsContext);
  const  { ligneDemandeListe, totals, reset } = context;
  const [formData, setFormData] = useState<DemandeServiceEntity>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});





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



  const resetAll = ()=> {
    setFormData(initialFormData);
    reset()
  }



  const addDemandeService = useCallback(async () => {
    if (!validateForm()) return;

    try {
      const data = await DemandeServiceService.AddDemandeService(ApiUrls.DEMANDE_SERVICE, formData);
      
      console.log("demande service added successfully", data);
      resetAll();
    } catch (error) {
      console.error('Error adding demande service:', error);
    }
  }, [formData, validateForm]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  }, []);


  useEffect(() => {
    // Update formData when ligneDemandeArr changes
    if(ligneDemandeListe.length > 0){
      setFormData((prevData) => ({...prevData, lignedemande: ligneDemandeListe }));
    }
  },[ligneDemandeListe]);

  useEffect(() => {
    setFormData((prevData) => ({...prevData, prix_ttc: totals.montant_TTC}));
  }, [totals]);


  const memoizedServiceListModal = useMemo(() => (
    <ServiceListModal
      resetData={()=>{}}
      onSaveItems={() => {}}
      selectedServices={[]}
    />
  ), []);

  const memoizedArticleListModal = useMemo(() => (
    <ArticleListModal
      resetData={()=>{}}
      onSaveItems={() => {}}
      selectedArticles={[]}
    />
  ), []);

  const memoizedCustomServiceModal = useMemo(() => (
    <CustomService/>
  ), []);

  return (
    <MainCmp>
      <ItemHeader title="Demande service" buttonText="Ajouter Employé" onButtonClick={() => {}} />
      <Container fluid className="full-height-container">
        <Row className="mt-4 full-height-row global-container-dmn">
          <Col xs={12} md={5} className="full-height-col demande-data-inp">
            <Form name="frmArticle" className="compact-form">
              <VehiculeForm formData={formData} handleChange={handleChange} errors={errors} />
              <hr className="section-divider" />
             <ClientForm formData={formData} handleChange={handleChange} errors={errors} /> 
              <hr className="section-divider" />
              <EmployeeForm formData={formData} handleChange={handleChange} errors={errors} />
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
              <DemandeServiceTable/>
              <Row className="mt-3">
                <Col className="text-end">
                  <Button variant="secondary" className="me-2 custom-btn custom-btn-reset" onClick={()=>{resetAll()}}>Réinitialiser</Button>
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
