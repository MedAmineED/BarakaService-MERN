/* eslint-disable @typescript-eslint/no-explicit-any */
import DemandeService from "./DemandeServiceEntity";

interface LigneDemande {
    [x: string]: any;
    id_ligne?: number;
    demande_srv?: number;
    type: string;
    categorie: string;
    element: number;
    reference: string;
    designation: string;
    prix: number;
    tva: number;
    remise: number;
    quantite: number;
    demandeService?: DemandeService;
}

export default LigneDemande;