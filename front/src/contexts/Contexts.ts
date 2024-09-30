import {  createContext, Dispatch, SetStateAction } from 'react';
import LigneDemande from '../entities/LigneDemande';
import ServiceEntity from '../entities/ServiceEntity';
import Article from '../entities/Article';
import DemandeServiceEntity from '../entities/DemandeServiceEntity';
import LigneFacture from '../entities/LigneFacture';



//----------------------------------------------------------------
//----- select items context -------------------------------------
//----------------------------------------------------------------
type Item = ServiceEntity | Article;
type Totals = {
  montant_HT: number,
  remise_total: number,
  montant_TVA: number,
  montant_TTC: number,
}


export const SelectedItmsContext = createContext<{
    selectedItems: { id: number, type: string }[],
    ligneDemandeListe : LigneDemande[],
    totals : Totals,
    setTotals: Dispatch<SetStateAction<Totals>>,
    setLigneDemandeListe: Dispatch<SetStateAction<LigneDemande[] | []>>,
    handleItemSelect: (item: Item) => void,
    removeItemSelect: (item: Item) => void,
    removeItemSelectXbutton : (item: LigneDemande) => void
    transformFromItemToLigneDemande: (item: Item) => void,
    reset: () => void,
  } | undefined>(undefined);


//----------------------------------------------------------------
//----- select items context  for "Facture"-----------------------
//----------------------------------------------------------------

type ItemToFact = Item | DemandeServiceEntity | { libelle: string; prix: number}

export const SelectedItmsForFactureContext = createContext<{
    selectedItems: { id: number, type: string }[],
    ligneFactureList: LigneFacture[],
    // itemToFactListe : ItemToFact[],
    totals : {
      montant_HT: number,
      remise_total: number,
      montant_TVA: number,
      montant_TTC: number,
    },
    timbreFiscale : number,
    setTimbreFiscale: Dispatch<SetStateAction<number>>,
    transformFromItemToLigneFacture: (item: ItemToFact)=> void,
    calculateTotals: ()=> void,
    handleItemSelect: (item: ItemToFact) => void,
    updateItem: (index: number, item: LigneFacture) => void,
    removeItemSelect: (item: ItemToFact) => void,
    removeItemSelectXbutton: (item: LigneFacture) => void,
} | undefined>(undefined);


