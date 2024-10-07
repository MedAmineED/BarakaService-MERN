import React, { useState } from 'react';
import { SelectedItmsContext } from './Contexts';
import ServiceEntity from '../entities/ServiceEntity';
import Article from '../entities/Article';
import LigneDemande from '../entities/LigneDemande';

type Item = ServiceEntity | Article | { libelle: string; prix: number, element : number};

interface MainSelectedContextProps { 
    children: React.ReactNode;
  }

const MainSelectedContext: React.FC<MainSelectedContextProps> = ({children})=> {
    const [selectedItems, setSelectedItems] = useState<{id: number, type: string}[] | []>([]);
    const [ligneDemandeListe, setLigneDemandeListe] = useState<LigneDemande[] | []>([]);

    //totals
    const [totals, setTotals] = useState({
      montant_HT: 0,
      remise_total: 0,
      montant_TVA: 0,
      montant_TTC: 0,
    });


    
    //------- add to selectedItems
    const handleItemSelect = (item: Item) => {
        if((item as ServiceEntity).libelle){
             setSelectedItems(prevItems => [...prevItems, {id: ((item as ServiceEntity)?.id) as number, type: 'service'}]);
        }else {
             setSelectedItems(prevItems => [...prevItems, {id: (item as Article)?.id as number, type: 'article'}]);
        }
    }




    //------- add to ligneDemande
    const transformFromItemToLigneDemande = (item: Item): LigneDemande | void => {
        console.log(item)
        let ligne: LigneDemande | null = null;
     
        // Check if the item is a service
        if (('libelle' in item) && item.id) {
            ligne = {
                demande_srv: 0,
                type: "service",
                categorie: item.categorie || "autre",
                element: item.id,
                reference: "some_reference", // Add appropriate reference logic if needed
                designation: item.libelle,
                prix: item.pu,
                tva: 0,
                remise: item.remise,
                quantite: 1,
            } as LigneDemande;
        } 
        // Check if the item is an article
        else if ('qte' in item) {
            ligne = {
                demande_srv: 0,
                type: "article",
                categorie: item.famille || "autre",
                element: item.id,
                reference: item.identification,
                designation: item.designation,
                prix: item.prix_vente,
                tva: item.tva,
                remise: 0,
                quantite: 1,
            } as LigneDemande;
        }else {
            // test verif id in list
            // add new id
            const uniqueId = parseInt(Math.random() * 1000000 + ""); 
            ligne = {
                demande_srv: 0,
                type: "custom",
                categorie: "autre",
                element: uniqueId,
                reference: "",
                designation: item.libelle,
                prix: item.prix,
                tva: 0,
                remise: 0,
                quantite: 1,
            } as LigneDemande;
        }
        if(ligne)
            setLigneDemandeListe([ligne, ...ligneDemandeListe]);
    };


    //---- remove from selection
    const removeItemSelect = (item: Item)=>{
        setSelectedItems(prevItems => prevItems.filter(i => i.id!== item.id));
        removeFromListLigneDemande(item);
    }
    const removeFromListLigneDemande = (item: Item)=>{
        setLigneDemandeListe(prevItems => prevItems.filter(i => i.element!== item.id));
    };


    //---- remove from selection
    const removeItemSelectXbutton = (item: LigneDemande)=>{
        if(item.type == "service" || item.type == "article"){
            setSelectedItems(prevItems => prevItems.filter(i => (!(i.id == item.element && i.type== item.type))));
            removeFromListLigneDemandeXbutton(item);
        } else {
            removeFromListLigneDemandeXbutton(item);
     }
    }
    const removeFromListLigneDemandeXbutton = (item: LigneDemande)=>{
        console.log(item)
        setLigneDemandeListe(prevItems => prevItems.filter(i =>{
            console.log(i.element + '==' + item.element)
            return !(i.element == item.element && i.type == item.type);
            }));
    };


    //----reset all data --------------------
    const reset = () => {
        setSelectedItems([]);
        setLigneDemandeListe([]);
        setTotals({
            montant_HT: 0,
            remise_total: 0,
            montant_TVA: 0,
            montant_TTC: 0,
        });
    }
    

    return (
        <SelectedItmsContext.Provider value={{ 
            selectedItems, 
            ligneDemandeListe,
            totals,
            setTotals,
            setLigneDemandeListe,
            handleItemSelect, 
            removeItemSelect,
            transformFromItemToLigneDemande,
            removeItemSelectXbutton,
            reset,
        }}>
            {children}
        </SelectedItmsContext.Provider>
    )
}


export default MainSelectedContext;