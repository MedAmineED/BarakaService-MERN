import DemandeService from "./DemandeServiceEntity";

interface Paiement {
    id_p: number;
    demande_srv: number;
    date_payement: Date;
    numero_cheque?: string;
    date_cheque?: Date;
    banque?: string;
    payer: boolean;
    montant: number;
    demandeService?: DemandeService;  // Optional association with DemandeService
}

export default Paiement;
