
interface Article {
    id?: number; 
    identification: string;
    designation: string;
    qte: number;
    qte_min: number;
    qte_max: number;
    prix_achat: number;
    prix_vente: number;
    tva: number;
    etat: number;
    inventaire: number;
    annee: number;
    famille?: string;
    familleId : number;
}

export default Article;
