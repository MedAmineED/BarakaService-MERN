import {  createContext, Dispatch, SetStateAction } from 'react';
import LigneDemande from '../entities/LigneDemande';
import ServiceEntity from '../entities/ServiceEntity';
import Article from '../entities/Article';

type Item = ServiceEntity | Article;

export const SelectedItmsContext = createContext<{
    selectedItems: { id: number, type: string }[],
    ligneDemandeListe : LigneDemande[],
    setLigneDemandeListe: Dispatch<SetStateAction<LigneDemande[] | []>>,
    handleItemSelect: (item: Item) => void,
    removeItemSelect: (item: Item) => void,
    removeItemSelectXbutton : (item: LigneDemande) => void
    transformFromItemToLigneDemande: (item: Item) => void,
  } | undefined>(undefined);


