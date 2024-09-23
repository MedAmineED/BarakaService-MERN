import DemandeService from "./DemandeServiceEntity";

interface Paiement {
    id_p?: number;
    demande_srv: number;
    date_payement?: Date;
    numero_cheque?: string | null;
    date_cheque?: Date | null;
    banque?: string | null;
    payer: boolean | number;
    montant: number;
    demandeService?: DemandeService;  // Optional association with DemandeService
}

export default Paiement;
