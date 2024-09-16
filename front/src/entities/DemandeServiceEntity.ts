import LigneDemande from "./LigneDemande";
import Paiement from "./Paiement";

interface DemandeServiceEntity {
    id_dem?: number;
    date_demande?: Date;
    matricule: string;
    conducteur: string;
    employer: string;
    heure_deb: string; 
    heure_fin: string; 
    client: string;
    bon_commande: string;
    prix_ttc: number;
    payer: number;
    marque: string;
    ligneDemandes?: LigneDemande[] | [];
    paiements?: Paiement[] | [];
}

export default DemandeServiceEntity;
