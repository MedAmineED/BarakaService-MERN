/* eslint-disable no-constant-condition */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DemandeServiceEntity from '../../entities/DemandeServiceEntity';
import DemandeServiceService from '../../ApiServices/DemandeServiceService';
import ApiUrls from '../../ApiUrl/ApiUrls';
import LigneDemande from '../../entities/LigneDemande';
import './detailsStyle.css';


const DetailsService: React.FC = () => {
  const [demandeService, setDemandeService] = useState<DemandeServiceEntity | null>({});
  const [ligneDemandes, setLigneDemandes] = useState<LigneDemande[] | []>([]);
  const [paiementMethod, setMethodState] = useState<string> ("espece")
  const [isPertiel, setIsPertiel] = useState<boolean>(false);
  const [totals, setTotals] = useState({
    totalRemise: 0,
    totalTax: 0,
    totalTTC: 0,
  });

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
      // alert("Remarque\n\nCette section est en cours de développement et n'est pas encore terminée. Des éléments doivent encore être corrigés");
       setLigneDemandes(demandeService?.ligneDemandes)
    }
  }, [demandeService])
  useEffect(() => {
    fetchDemandeList();
  }, [id]);


  useEffect(() => {
    // Calculate totals
    let totalRemise = 0;
    let totalTax = 0;
    let totalTTC = 0;

    ligneDemandes.forEach((ld) => {
      const prixAfterRemise = ld.prix - (ld.remise || 0);
      const tax = prixAfterRemise * (ld.tax || 0) / 100; // Assuming tax is a percentage
      const ttc = (prixAfterRemise * ld.quantite) + tax;

      totalRemise += ld.remise || 0;
      totalTax += tax;
      totalTTC += ttc;
    });

    setTotals({
      totalRemise,
      totalTax,
      totalTTC,
    });
  }, [ligneDemandes]);

  // if (!demandeService?.lignedemande) return <div>Loading...</div>;

  return (
    <main id="main">
      <section id="PaimentServices" className="d-flex align-items-center">
        <div className="container-fluid">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center py-3">
              <h2 className="h5 mb-0">Numero de Commandes #{demandeService?.id_dem}</h2>
            </div>

            <div className="row">
              <div className="col-lg-9">
                
              <div className="invoice-header">
  </div>
  <div className="ui segment cards scroll-x-auto">

    <div className="ui segment itemscard">
      <div className="content">
      <table className="ui celled table table-striped">
                        <thead>
                          <tr>
                            <th>Libelle</th>
                            <th className="text-center colfix">Prix U</th>
                            <th className="text-center colfix">Qte</th>
                            <th className="text-center colfix">Remise</th>
                            <th className="text-center colfix">Tax</th>
                            <th className="text-center colfix">TTC</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            ligneDemandes.map((ld, index) => {
                              const prixAfterRemise = ld.prix - (ld.remise || 0);
                              const tax = prixAfterRemise * (ld.tax || 0) / 100;
                              const ttc = (prixAfterRemise * ld.quantite) + tax;

                              return (
                                <tr key={index}>
                                  <td>
                                    {ld.designation}
                                    <br />
                                    <small className="text-muted">{ld.type}</small>
                                  </td>
                                  <td className="text-right align-middle">{ld.prix} DT</td>
                                  <td className="text-right align-middle">{ld.quantite}</td>
                                  <td className="text-right align-middle">{ld.remise} DT</td>
                                  <td className="text-right align-middle">{tax.toFixed(3)} DT</td>
                                  <td className="text-right align-middle">{ttc.toFixed(3)} DT</td>
                                </tr>
                              );
                            })
                          }
                        </tbody>
                        <tfoot className="full-width">
                          <tr>
                            <th>Total:</th>
                            <th colSpan={2}></th>
                            <th colSpan={1}>{totals.totalRemise.toFixed(2)} DT</th>
                            <th colSpan={1}>{totals.totalTax.toFixed(2)} DT</th>
                            <th colSpan={1}>{totals.totalTTC.toFixed(2)} DT</th>
                          </tr>
                        </tfoot>
                      </table>

      </div>
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

              <div className="col-lg-3">
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
