/* eslint-disable no-constant-condition */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DemandeServiceEntity from '../../entities/DemandeServiceEntity';
import DemandeServiceService from '../../ApiServices/DemandeServiceService';
import ApiUrls from '../../ApiUrl/ApiUrls';
import LigneDemande from '../../entities/LigneDemande';


const DetailsService: React.FC = () => {
  const [demandeService, setDemandeService] = useState<DemandeServiceEntity | null>({});
  const [ligneDemandes, setLigneDemandes] = useState<LigneDemande[] | []>([]);
  const [paiementMethod, setMethodState] = useState<string> ("")
  const [isPertiel, setIsPertiel] = useState<boolean>(false);

  const location = useLocation();
  const { id } = location.state;

  const fetchDemandeList = async (): Promise<void> => {
    try {
      console.log("iddddd: ", id)
      const response = await DemandeServiceService.GetDemandeServiceById(`${ApiUrls.DEMANDE_SERVICE}`, id);
      console.log("response ", response);
      setDemandeService(response);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  useEffect(()=>{
    if(demandeService?.ligneDemandes){
      alert("Remarque\n\nCette section est en cours de développement et n'est pas encore terminée. Des éléments doivent encore être corrigés");
       setLigneDemandes(demandeService?.ligneDemandes)
    }
  }, [demandeService])
  useEffect(() => {
    fetchDemandeList();
  }, [id]);

  // if (!demandeService?.lignedemande) return <div>Loading...</div>;

  const prixTH = 1000
  const remiseTotal = 50
  const taxTotal = 100

  return (
    <main id="main">
      <section id="PaimentServices" className="d-flex align-items-center">
        <div className="container-fluid">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center py-3">
              <h2 className="h5 mb-0">Numero de Commandes #{15}</h2>
            </div>

            <div className="row">
              <div className="col-lg-8">
                <div className="card cardpaiment mb-4">
                  <div className="card-body">
                    <div className="mb-3 d-flex justify-content-between">
                      <div>
                        <span className="me-3">{"22-06-2024"}</span>
                        <span className="me-3">#{555}</span>
                      </div>
                    </div>
                    <table className="table">
                      <thead>
                        <tr>
                          <td className="text-start">Reference</td>
                          <td className="text-start">Designation</td>
                          <td className="text-start">Prix</td>
                          <td className="text-start">TVA</td>
                          <td className="text-start">Remise</td>
                          <td className="text-start">Quantite</td>
                        </tr>
                      </thead>
                      <tbody>
                        {ligneDemandes.map((item, index) => (
                          <tr key={index}>
                            <td className="text-start">{item.reference}</td>
                            <td className="text-start">{item.designation}</td>
                            <td className="text-start">{item.prix}</td>
                            <td className="text-start">{item.tva}</td>
                            <td className="text-start">{item.remise}</td>
                            <td className="text-start">{item.quantite}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className='d-flex flex-column'>
                        <tr>
                          <td colSpan={2}>Prix HT</td>
                          <td className="text-end">{prixTH} DT</td>
                        </tr>
                        <tr>
                          <td colSpan={2}>TAX TOTAL</td>
                          <td className="text-end">{taxTotal} DT</td>
                        </tr>
                        <tr>
                          <td colSpan={2}>Remise</td>
                          <td className="text-danger text-end">{remiseTotal} DT</td>
                        </tr>
                        <tr className="fw-bold">
                          <td colSpan={2}>TOTAL</td>
                          <td className="text-end">{5000} DT</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Payment section */}
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-4">
                        <h3 className="h6"><strong>Methode de paiement</strong></h3>
                        <select
                          id="selectPaiment"
                          className='text-primary'
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setMethodState(e.target.value) }}
                          disabled={demandeService?.payer ==1}
                        >
                          <option value="espece">Espece</option>
                          <option value="cheque">Cheque</option>
                        </select>
                        {demandeService?.payer == 1 ? (
                          <span className="badge bg-success rounded-pill">PAYE</span>
                        ) : (
                          <span className="badge bg-danger rounded-pill">IMPAYE</span>
                        )}

                        <div id="chequeOptions" hidden = {paiementMethod == "espece"} >
                          <div className="form-outline">
                            <label className="form-label" htmlFor="nomBanqueInput">Banque</label>
                            <input type="text" id="nomBanqueInput" className="form-control" disabled={false} />
                          </div>
                          <div className="form-outline mt-2">
                            <label className="form-label" htmlFor="numeroChequeInput">Numero de cheque</label>
                            <input type="text" id="numeroChequeInput" className="form-control" disabled={false} />
                          </div>
                          <div className="form-outline mt-2">
                            <label className="form-label" htmlFor="dateChequeInput">Date de cheque</label>
                            <input type="text" id="dateChequeInput" className="form-control" disabled={false} />
                          </div>
                          <div className="form-check mt-2">
                            <input className="form-check-input" type="checkbox" id="chequeSansSolde" />
                            <label className="form-check-label" htmlFor="chequeSansSolde">Chèque sans solde</label>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4 d-flex flex-column">
                        <h3 className="h6"><strong>Paiement partiel ou total</strong></h3>
                        <select
                          id="typePaiment"
                          className='text-primary'
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setIsPertiel(e.target.value == "partiel") }}
                          disabled={false}
                        >
                          <option value="totale">Totale</option>
                          <option value="partiel">Partiel</option>
                        </select>
                        <div className="form-outline" id="montantInput" hidden = {!isPertiel}>
                          <label className="form-label" htmlFor="montantInputField">Montant</label>
                          <input
                            type="number"
                            max={10}
                            min={0}
                            className="form-control"
                            id="montantInputField"
                            disabled={false}
                          />
                          <small className="text-danger" id="prixMaxErr" hidden>
                            le prix maximale est {20000} DT
                          </small>
                        </div>
                        <button
                          type="button"
                          className="btn btn-success btn-lg mt-3"
                          onClick={() => {/* Handle payment action */ }}
                          disabled={false}
                        >
                          Payer <i className="bi bi-cash"></i>
                        </button>
                      </div>

                      <div className="col-lg-4">
                        <strong>Afficher facture</strong><br />
                        <a href="javascript:void(0);" className="text-dark">Reçu</a> |
                        <a href="javascript:void(0);" className="text-dark">Facture</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-body">
                    <p><strong>Informations</strong></p>
                    <p>Matricule: {demandeService?.matricule}</p>
                    <p>Conducteur: {demandeService?.conducteur}</p>
                    <p>Client: {demandeService?.client}</p>
                    <p>Marque: {demandeService?.marque} </p>
                    <p>Heure debut: {demandeService?.heure_deb} h</p>
                    <p>Heure fin: {demandeService?.heure_fin} h</p>
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
