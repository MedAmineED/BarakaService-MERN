import Facture from "./Facture"; // Import Facture entity if needed

interface LigneFacture {
    id?: number;
    id_fact?: number;
    reference: string;
    designation?: string;
    pu?: number;
    qte?: number;
    tva?: string;
    remise?: number;
    pht?: number;
    ptt?: number;
    facture?: Facture;
    element? :number;
    type? : string;
}

export default LigneFacture;
