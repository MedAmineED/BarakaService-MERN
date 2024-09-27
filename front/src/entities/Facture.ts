import LigneFacture from "./LigneFacture";
import DemandeServiceEntity from "./DemandeServiceEntity";

interface Facture {
    id_fact?: number;
    date_facture: Date;
    client: string;
    id_dem: number;
    num_fact: string;
    pht: number;
    tax: number;
    remise_total: number;
    timbre_fiscal: number;
    prix_ttc: number;
    ligneFacture?: LigneFacture[] | [];
    demandeService?: DemandeServiceEntity;
}

export default Facture;
