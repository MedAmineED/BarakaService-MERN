/* eslint-disable no-constant-condition */
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DemandeServiceEntity from '../../../entities/DemandeServiceEntity';
import DemandeServiceService from '../../../ApiServices/DemandeServiceService';
import ApiUrls from '../../../ApiUrl/ApiUrls';
import LigneDemande from '../../../entities/LigneDemande';
import './detailsStyle.css';
import PaimentServices from '../../../ApiServices/PaimentServices';
import Paiement from 'src/entities/Paiement';
import { Form, Button } from 'react-bootstrap';
import FcatureService from '../../../ApiServices/FactureService';
import Facture from 'src/entities/Facture';

const DetailsService: React.FC = () => {
  const [demandeService, setDemandeService] = useState<DemandeServiceEntity | null>(null);
  const [ligneDemandes, setLigneDemandes] = useState<LigneDemande[]>([]);
  const [paiementMethod, setPaiementMethod] = useState<string>('espece');
  const [isPartiel, setIsPartiel] = useState<boolean>(false);
  const [paiemntDetails, setpaiemntDetails] = useState<Paiement>({
    demande_srv: 0,
    montant: 0,
    payer: false,
    numero_cheque: '',
    date_cheque: null,
    banque: '',
  });
  const [totals, setTotals] = useState({
    totalRemise: 0,
    totalTax: 0,
    totalTTC: 0,
  });
  const [paiementSum, setPaiementSum] = useState<number>(0); 
  const [alertMessage, setAlertMessage] = useState<{
    isError : boolean,
    message: string,
  }>({
    isError: false,
    message: '',
  });
  const [timbreFiscal, setTimbreFiscal] = useState<number>(0);
  const [alertIsOpen, setAlertIsOpen] = useState<boolean>(false);
  const [hasFacture, setHasFacture] = useState<boolean>(false);
  const [facture, setFacture] = useState<Facture | null>(null);

  const navigate = useNavigate();

  const location = useLocation();
  const { id } = location.state;

  //--- INPUT HANDLER --------------------------------
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { id, value } = e.target;
      setpaiemntDetails((prevData) => ({ ...prevData, [id]: value }));
    },
    []
  );

  const handleMethodPaiementChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setPaiementMethod(e.target.value);
  };

  const handleIsPartial = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setIsPartiel(e.target.value === 'partiel');
    if(!isPartiel && demandeService){
      setpaiemntDetails((prevData) => ({...prevData, montant: demandeService?.prix_ttc }));
    }
  };

  const timbreFiscaleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
   setTimbreFiscal(parseFloat(value));
  }

  //----ClCK EVENTS --------------------------------
  const handleNavigateToFacture = ():void => {
    navigate('/facture', {
      state: {
        demandeService: demandeService,
        timbreFiscal: parseFloat((demandeService?.prix_ttc - totals.totalTTC).toFixed(3)),
        totals,
        facture
      }
  });
  };

  //---API REQUESTS --------------------------------

  const fetchDemandeService = async (): Promise<void> => {
    try {
      const response = await DemandeServiceService.GetDemandeServiceById(`${ApiUrls.DEMANDE_SERVICE}`, id);
      setDemandeService(response);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const getFacture = async (): Promise<void> => {
    try {
      const response = await FcatureService.GetFactureByIdDem(`${ApiUrls.FACTURE}`, id);
      if(response){
        setHasFacture(true);
      }
      setFacture(response);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const fetchPiementsSum = async (): Promise<void> => {
    try {
      const response = await PaimentServices.GetSum(`${ApiUrls.PAIMENTS}`, id);
      setPaiementSum(response);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handlePaiement = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      if(demandeService && (paiemntDetails.montant > 0) && ((parseFloat((parseFloat(paiemntDetails.montant+"") + paiementSum).toFixed(3))) <= (demandeService?.prix_ttc + timbreFiscal))){
          await PaimentServices.PaiementOperation(`${ApiUrls.PAIMENTS}`, id, parseFloat((timbreFiscal + demandeService.prix_ttc).toFixed(3)), paiemntDetails);
          setTimbreFiscal(0);
          await fetchDemandeService();
          await fetchPiementsSum();
          setAlertMessage({
            isError: false,
            message: 'Paiement ajouté avec succès',
          })
          // refresh the page after the paiement is added
    }
    else if(demandeService && parseFloat((parseFloat(paiemntDetails.montant+"") + paiementSum).toFixed(3)) > demandeService?.prix_ttc){
      setAlertMessage({
        isError: true,
        message: 'Mantant maximale est ' + parseFloat((demandeService.prix_ttc - paiementSum).toFixed(3)),
      })
    }
    else{
      //errere : obliger d ajout mantant je bseoin un message en francais
      setAlertMessage({
        isError: true,
        message: "Erreur : Vous devez ajouter un montant valide."
      })
      console.log("can not add paiement because it is not available");
    }
    } catch (err) {
      console.error('Error adding paiement:', err);
    }
  };

  //--- LIFECYCLE --------------------------------

  useEffect(()=> {
    getFacture();
  }, [])

  useEffect(() => {
    if (demandeService?.ligneDemandes) {
      setLigneDemandes(demandeService.ligneDemandes);
    }
  }, [demandeService]);

  useEffect(() => {
    fetchPiementsSum();
    fetchDemandeService();
  }, [id]);

  useEffect(() => {
    let totalRemise = 0;
    let totalTax = 0;
    let totalTTC = 0;

    ligneDemandes.forEach((ld) => {
      //--- calculate totals for each ligneDemande ---
      const prixAfterRemise = ld.prix - (ld.remise || 0);
      const tax = ((ld.prix * (ld.tva || 0)) / 100) * ld.quantite;
      const ttc = prixAfterRemise * ld.quantite + tax;

      //--- update values for the global Totals ---
      totalRemise += (ld.remise * ld.quantite) || 0;
      totalTax += tax;
      totalTTC += ttc;
    });

    //--- update the global state of Totals ---
    setTotals({
      totalRemise,
      totalTax,
      totalTTC,
    });
  }, [ligneDemandes]);

  useEffect(()=> {
    setpaiemntDetails(((prv)=>{
      return {...prv, demande_srv: id, montant: parseFloat(((demandeService?.prix_ttc - paiementSum) + timbreFiscal).toFixed(3)) }
    }))
  }, [id, paiementSum, totals.totalTTC, timbreFiscal])



  useEffect(() =>{        
    if(alertMessage.message){
      setAlertIsOpen(true);
      const timer = setTimeout(() => {
          setAlertIsOpen(false);
      }, 5000)

      return () => clearTimeout(timer); 
    }else {
      setAlertIsOpen(false);
    }

  }, [alertMessage])

  return (
    <main id="main">

      <section id="PaimentServices" className="d-flex align-items-center position-relative">
        <div className={`alert alert-notif z-3 right-50 position-fixed w-100 ${alertMessage.isError? "alert-danger" : "alert-success"}`} hidden= {!alertIsOpen} role="alert">
          {alertMessage.message}
        </div>
        <div className="container-fluid">
          {/* Header Information Section */}
          <div className="container mb-4">
            <div className="d-flex justify-content-between align-items-center py-3">
              <h2 className="h5 mb-0">Numero de Commande #{demandeService?.id_dem}</h2>
            </div>
            <div className="row mb-3 border pt-2 flex align-items-center">
              <div className="col-md-4">
                <p className="details-info">
                  <strong>Date Demande: </strong>
                  {(demandeService?.date_demande + '').split('T')[0]}
                </p>
                <p className="details-info">
                  <strong>Matricule: </strong>
                  {demandeService?.matricule}
                </p>
              </div>
              <div className="col-md-4" hidden = {demandeService?.conducteur? false : true}>
                <p className="details-info">
                  <strong>Conducteur: </strong>
                  {demandeService?.conducteur}
                </p>
                <p className="details-info">
                  <strong>Employé: </strong>
                  {demandeService?.employer}
                </p>
              </div>
              <div className="col-md-4">
                <p className="details-info" hidden = {demandeService?.bon_commande? false : true}>
                  <strong>Bon Commande: </strong>
                  {demandeService?.bon_commande}
                </p>
                <p className="details-info">
                  <strong>Prix TTC: </strong>
                  {((demandeService?.prix_ttc || 0)+ (timbreFiscal || 0)).toFixed(3)} DT
                </p>
                <p className="details-info">
                     <label 
                        className='timbre-fiscal' 
                        htmlFor='itimbreFiscale'
                        >
                        Timbre Fiscale
                    </label>
                   <input id='itimbreFiscale' 
                         type="number" 
                         min={0}
                         value={timbreFiscal}
                         onChange={timbreFiscaleChange}
                         disabled={demandeService?.payer === 1 || demandeService?.payer === 2}
                         />
                   <span className='span-fiscale'> DT</span>
                </p>
              </div>
              <div className="col-md-4">
                <p className="details-info">
                  <strong>Payee: {paiementSum}</strong>
                </p>
                <p className="details-info">
                  <strong>Reste: {((demandeService?.prix_ttc - paiementSum) + (timbreFiscal || 0)).toFixed(3) }</strong>
                </p>
                <p className="details-info">
                  {demandeService?.payer === 1 ? (
                        <span className="badge bg-success rounded-pill mt-2">PAYE</span>
                      ) :
                      demandeService?.payer === 2? (
                        <div className='text-warning'><i className="bi bi-patch-exclamation"></i> Partiel</div>
                      ) :
                      <span className="badge bg-danger rounded-pill mt-2">IMPAYE</span>
                      }
                </p>
              </div>
            </div>
          </div>

          {/* Details and Paiement Sections in Same Row */}
          <div className="row">
            {/* Details Table Section */}
            <div className="col-lg-8">
              <div className="table-responsive" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                <table className="table table-striped table-bordered table-sm">
                  <thead className="thead-light sticky-header">
                    <tr>
                      <th>Libelle</th>
                      <th className="text-center">Prix U</th>
                      <th className="text-center">Qte</th>
                      <th className="text-center">Remise</th>
                      <th className="text-center">Tax</th>
                      <th className="text-center">TTC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ligneDemandes.map((ld, index) => {
                      const prixAfterRemise = ld.prix - (ld.remise || 0);
                      const taxU = (ld.prix * (ld.tva || 0)) / 100;
                      const taxT = taxU * ld.quantite;
                      const ttc = prixAfterRemise * ld.quantite + taxT;

                      return (
                        <tr key={index}>
                          <td style={{ padding: '0.25rem' }}>
                            {ld.designation}
                            <br />
                            <small className="text-muted">{ld.type}</small>
                          </td>
                          <td className="text-right" style={{ padding: '0.25rem' }}>
                            {ld.prix} DT
                          </td>
                          <td className="text-right" style={{ padding: '0.25rem' }}>
                            {ld.quantite}
                          </td>
                          <td className="text-right" style={{ padding: '0.25rem' }}>
                            {(ld.remise * ld.quantite).toFixed(3)} DT
                            <br />
                            <small className="text-muted">
                              Unitaire: {(ld.remise).toFixed(3)} DT
                            </small>
                          </td>
                          <td className="text-right" style={{ padding: '0.25rem' }}>
                            {taxT.toFixed(3)} DT
                            <br />
                            <small className="text-muted">
                              Unitaire: {taxU} DT
                              <br />
                              TVA: {ld.tva}%
                            </small>
                          </td>
                          <td className="text-right" style={{ padding: '0.25rem' }}>
                            {ttc.toFixed(3)} DT
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="fixed-footer">
                <table className="table table-striped table-bordered table-sm mb-0">
                  <tfoot className="bg-light">
                    <tr>
                      <th>Total:</th>
                      <th></th>
                      <th></th>
                      <th>
                        Remise:
                        <br />
                        {totals.totalRemise.toFixed(3)} DT
                      </th>
                      <th>
                        Tax:
                        <br />
                        {totals.totalTax.toFixed(3)} DT
                      </th>
                      <th>
                        TTC:
                        <br />
                        {totals.totalTTC.toFixed(3)} DT
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Paiement Section */}
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="section">
                    <div className="section-title inputs-sec-title">
                      <strong>Methode de paiement</strong>
                    </div>

                    <Form.Group controlId="selectPaiment" className="mb-2">
                      <Form.Label>Méthode de Paiement</Form.Label>
                      <Form.Control
                        as="select"
                        size="sm"
                        className="text-primary"
                        value={paiementMethod}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {handleMethodPaiementChange(e);}}
                        disabled={demandeService?.payer === 1}
                        isInvalid={demandeService?.payer === 1}
                      >
                        <option value="espece">Espèce</option>
                        <option value="cheque">Chèque</option>
                      </Form.Control>
                    </Form.Group>

                    {paiementMethod === 'cheque' && (
                      <div className="mt-3">
                        <Form.Group 
                            onSubmit={(e: React.FormEvent)=>{ e.preventDefault();}}
                            controlId="banque" className="mb-2"
                            >
                          <Form.Label>Banque</Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            type="text"
                            size="sm"
                            placeholder="Nom de la banque"
                          />
                        </Form.Group>

                        <Form.Group controlId="numero_cheque" className="mb-2">
                          <Form.Label>Numéro de chèque</Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            type="text"
                            size="sm"
                            placeholder="Numéro de chèque"
                          />
                        </Form.Group>

                        <Form.Group controlId="date_cheque" className="mb-2">
                          <Form.Label>Date de chèque</Form.Label>
                          <Form.Control onChange={handleChange} type="date" size="sm" />
                        </Form.Group>

                        <Form.Group controlId="chequeSansSolde" className="mb-2">
                          <Form.Check type="checkbox" label="Chèque sans solde" />
                        </Form.Group>
                      </div>
                    )}

                    <div className="section mt-3">
                      <div className="section-title inputs-sec-title">
                        <strong>Paiement partiel ou total</strong>
                      </div>

                      <Form.Group controlId="typePaiment" className="mb-2">
                        <Form.Label>Paiement</Form.Label>
                        <Form.Control
                          as="select"
                          size="sm"
                          value={isPartiel ? 'partiel' : 'total'}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>{
                            handleIsPartial(e);
                          }
                          }
                          disabled={demandeService?.payer === 1}
                          isInvalid={demandeService?.payer === 1}
                        >
                          <option value="totale">Total</option>
                          <option value="partiel">Partiel</option>
                        </Form.Control>
                      </Form.Group>

                      {isPartiel && (
                        <Form.Group controlId="montant" className="mb-2">
                          <Form.Label>Montant</Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            type="number"
                            size="sm"
                            placeholder="Montant"
                          />
                          <Form.Control.Feedback type="invalid">
                            Le prix maximale est {parseFloat(totals.totalTTC.toFixed(3)) - paiementSum} DT
                          </Form.Control.Feedback>
                        </Form.Group>
                      )}
                    <div className="btn-paiementd">
                      <Button
                        type="submit"
                        variant="success"
                        size="lg"
                        className="paye-btn mt-3"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handlePaiement(e)}
                        disabled={demandeService?.payer === 1}
                        >
                        Payer <i className="bi bi-cash"></i>
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="afficher-facture-btn mt-3"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleNavigateToFacture(e)}
                      >
                        {!hasFacture? "Creer Facture" : "Facture"} <i className="bi bi-receipt"></i>
                      </Button>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DetailsService;
