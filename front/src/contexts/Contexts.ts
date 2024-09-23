import {  createContext, Dispatch, SetStateAction } from 'react';
import LigneDemande from '../entities/LigneDemande';
import ServiceEntity from '../entities/ServiceEntity';
import Article from '../entities/Article';



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



