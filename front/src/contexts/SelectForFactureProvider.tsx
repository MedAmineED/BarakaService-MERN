import React, { useState } from 'react';
import { SelectedItmsForFactureContext } from './Contexts';
import ServiceEntity from '../entities/ServiceEntity';
import Article from '../entities/Article';
import LigneDemande from '../entities/LigneDemande';
import DemandeServiceEntity from '../entities/DemandeServiceEntity';
import LigneFacture from '../entities/LigneFacture';
import Facture from '../entities/Facture';
import FactureService from '../ApiServices/FactureService';
import ApiUrls from '../ApiUrl/ApiUrls';
import { useLocation } from 'react-router-dom';

const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Add leading 0 if needed
    const day = String(today.getDate()).padStart(2, '0'); // Add leading 0 if needed
    return `${year}-${month}-${day}`;
  };


type Item = ServiceEntity | Article | { libelle: string; prix: number} | DemandeServiceEntity;


interface SelectForFactureProviderProps { 
    children: React.ReactNode;
  }

const SelectForFactureProvider: React.FC<SelectForFactureProviderProps> = ({children})=> {
    const location = useLocation();
    const { id } = location.state;
    const [ligneFactureList, setLigneFactureList] = useState<LigneFacture[]>([]);

      // const [ligneDemandeListe, setLigneDemandeListe] = useState<LigneDemande[] | []>([]);
      
      const [timbreFiscale, setTimbreFiscale] = useState<number>(0)
      
      //totals
      const [totals, setTotals] = useState({
          montant_HT: 0,
          remise_total: 0,
          montant_TVA: 0,
          montant_TTC: 0,
        });
        
        //datre
        const [dateFacture, setDateFacture] = useState(getCurrentDate()); 

        //---------facture finale --------------------
        const [factureFinal, setFactureFinal] = useState<Facture | null>();
        
       const [selectedItems, setSelectedItems] = useState<{id: number, type: string}[] | []>([]);
    
    // ------- add to selectedItems
    const handleItemSelect = (item: Item) => {
        if((item as ServiceEntity).libelle){
             setSelectedItems(prevItems => [...prevItems, {id: ((item as ServiceEntity)?.id) as number, type: 'service'}]);
        }else if((item as Article).qte){
             setSelectedItems(prevItems => [...prevItems, {id: (item as Article)?.id as number, type: 'article'}]);
        }else if((item as DemandeServiceEntity).matricule){
            let selected = [];
            (item as  DemandeServiceEntity).ligneDemandes?.map((itm)=> {
                selected= [...selected, {id:itm.element, type:itm.type}]
            })
            setSelectedItems(prevItems => [...prevItems, ...(selected as {id: number, type: string}[])]);
        }
    }




    //------- add to ligneFacture
    const transformFromItemToLigneFacture = (item: Item): void => {
        console.log(item);
        let ligne: LigneFacture | null = null;
        let ligneDemandeList: LigneFacture[] = [];
     
        // Check if the item is a service
        if (('libelle' in item) && item.id) {
            console.log(item)
            ligne = {
                reference: "Ref-" + (item.id),
                designation: (item as ServiceEntity).libelle,
                pu: (item as ServiceEntity).pu,
                qte: 1,
                tva: 0,
                remise: (item as ServiceEntity).remise,
                pht: (item as ServiceEntity).pu,
                ptt: (item as ServiceEntity).pu,
                element: item.id,
                type: "service"
            };
            console.log(ligne)
        } 
        // Check if the item is an article
        else if ('qte' in item) {
            ligne = {
                reference: "Ref-" + ((item as Article).identification),
                designation: (item as Article).designation,
                pu: (item as Article).prix_vente,
                qte: 1,
                tva: (item as Article).tva,
                remise: 0,
                pht: (item as Article).prix_vente,
                ptt: 0,
                element: item.id,
                type: "article"
            };
        } else if('matricule' in item) {
            ligneDemandeList = (item as DemandeServiceEntity).ligneDemandes?.map((el) => {
                return {
                    element: el.element,
                    reference: el.reference,
                    designation: el.designation,
                    pu: el.prix,
                    qte: el.quantite,
                    tva: el.tva,
                    remise: el.remise,
                    pht: el.prix * el.quantite,
                    ptt: parseFloat(((el.prix * (1 + (el.tva / 100)) - el.remise) * el.quantite).toFixed(3)),
                    type: el.type
                };
            }) || [];
        } else {
            const uniqueId = parseInt(Math.random() * 1000000 + ""); 
            console.log(uniqueId)
            ligne = {
                element: uniqueId,
                reference: "Ref-",
                designation: item.libelle,
                pu: item.prix,
                qte: 1,
                tva: 0,
                type: "custom",
                remise: 0,
                pht: item.prix,
                ptt: item.prix,
            };
        }

        // Check for duplicates and add new items
        if (ligne) {
            if (!ligneFactureList.some(existingLigne => existingLigne.element === ligne!.element)) {
                setLigneFactureList(prevList => {
                    const calculatedLigne = {
                        ...ligne,
                        pht: parseFloat((ligne.pu * ligne.qte).toFixed(3)),
                        ptt: parseFloat(((ligne.pht * (1 + (ligne.tva / 100)) - (ligne.remise * ligne.qte))).toFixed(3)),
                    }
                    return[...prevList, calculatedLigne]
                });
            }
        } else if (ligneDemandeList.length > 0) {
            const newItems = ligneDemandeList.filter(newLigne => 
                !ligneFactureList.some(existingLigne => existingLigne.element === newLigne.element)
            );
            setLigneFactureList(prevList => [...prevList, ...newItems]);
        }
    };


    //---- culculate totals --------------------------------
    const calculateTotals = () => {
        let montant_HT = 0;
        let remise_total = 0;
        let montant_TVA = 0;
        let montant_TTC = 0;

        ligneFactureList.forEach(ligne => {
            montant_HT += ligne.pht;
            remise_total += ligne.remise * ligne.qte;
            montant_TVA += ligne.pht * ligne.tva / 100;
            montant_TTC += ligne.ptt;
        });

        setTotals({
            montant_HT: parseFloat(montant_HT.toFixed(3)),
            remise_total: parseFloat(remise_total.toFixed(3)),
            montant_TVA: parseFloat(montant_TVA.toFixed(3)),
            montant_TTC: parseFloat((montant_TTC + (timbreFiscale || 0)).toFixed(3)),
        });
    };

    //----- update items 
    const updateItem = (index: number, updatedItem: LigneFacture) => {
        const updatedLignes = ligneFactureList.map((item, i) => (i === index ? updatedItem : item));
        console.log(updatedLignes)
        const calculatedLignes = updatedLignes.map((item, i) =>{
            return {
                ...item,
                pht: parseFloat((item.pu * item.qte).toFixed(3)),
                ptt: parseFloat((((item.pu * (1 + (item.tva / 100))* item.qte) - (item.remise * item.qte))).toFixed(3)),
            }
        });
        setLigneFactureList([...calculatedLignes]);
    };


    //---- const add timbre fiscales --------------------

    //---- remove from selection
    const removeItemSelect = (item: Item)=>{
        setSelectedItems(prevItems => prevItems.filter(i => i.id!== item.id));
        removeFromListLigneFacture(item);
    }
    const removeFromListLigneFacture = (item: Item)=>{
        setLigneFactureList(prevItems => prevItems.filter(i => i.element!== item.id));
    };


    //---- remove from x button
    const removeItemSelectXbutton = (item: LigneFacture)=>{
        setSelectedItems(prevItems => prevItems.filter(i => (!(i.id == item.element && i.type == item.type))));
        removeFromListLigneFactureXbutton(item);
    }
    const removeFromListLigneFactureXbutton = (item: LigneDemande)=>{
        console.log(item)
        setLigneFactureList(prevItems => prevItems.filter(i =>{
            console.log(i.element + '==' + item.element)
            return !(i.element == item.element && i.type == item.type);
            }));
    };


    //---- create facture final --------------------
    const createFactureFinal = (factureHeader : {  date_facture: Date;
                                                    client: string;
                                                    id_dem: number;
                                                    num_fact: string;
                                                }) => {
        const factureFinal: Facture = {
            pht: totals.montant_HT,
            tax: totals.montant_TVA,
            remise_total: totals.remise_total,
            timbre_fiscal: timbreFiscale,
            prix_ttc: totals.montant_TTC,
            ligneFacture: ligneFactureList,
            ...factureHeader,
        };
        setFactureFinal(factureFinal);
    }


    const getFactureById = async ()=> {
        try {
            if(id){
                const response = await FactureService.GetFactureById(`${ApiUrls.FACTURE}`, id);
                setFactureFinal(response);
                setLigneFactureList(response.ligneFacture);
            }
          } catch (err) {
            console.log("Error fetching facture:", err);
          }
    }


    //----reset all data --------------------
    // const reset = () => {
    //     setSelectedItems([]);
    //     setLigneDemandeListe([]);
    //     setTotals({
    //         montant_HT: 0,
    //         remise_total: 0,
    //         montant_TVA: 0,
    //         montant_TTC: 0,
    //     });
    // }
    

    return (
        <SelectedItmsForFactureContext.Provider value={{ 
            selectedItems, 
            ligneFactureList,
            // ligneDemandeListe,
            totals,
            // setTotals,
            // setLigneDemandeListe,
            timbreFiscale,
            dateFacture,
            setDateFacture,
            setTimbreFiscale,
            handleItemSelect,
            transformFromItemToLigneFacture,
            calculateTotals,
            removeItemSelect,
            removeItemSelectXbutton,
            updateItem,
            factureFinal,
            createFactureFinal,
            getFactureById
            // reset,
        }}>
            {children}
        </SelectedItmsForFactureContext.Provider>
    )
}


export default SelectForFactureProvider;