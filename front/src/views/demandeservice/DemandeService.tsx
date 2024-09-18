import React, { FC, useCallback, useMemo, useState } from 'react';
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
  payer: 1, 
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
 *         |========> transfer item to ligneService
 * 
 * 
 * 
 */





const DemandeService: FC = () => {

  const [formData, setFormData] = useState<DemandeServiceEntity>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});




  const getPrixTTC = useCallback((prixTTC: number) => {
    // setFormData((prevData) => ({ ...prevData, prix_ttc: prixTTC }));
  }, [formData]);

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
      console.log("demande service added successfully", data);
    } catch (error) {
      console.error('Error adding demande service:', error);
    }
  }, [formData, validateForm]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  }, []);



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
              <DemandeServiceTable
                getPrixTTC={getPrixTTC}
              />
              <Row className="mt-3">
                <Col className="text-end">
                  <Button variant="secondary" className="me-2 custom-btn custom-btn-reset" onClick={()=>{}}>Réinitialiser</Button>
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
