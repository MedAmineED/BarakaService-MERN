/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState,  useContext } from 'react'
import ServiceEntity from '../../../entities/ServiceEntity';
import Article from '../../../entities/Article';
import { SelectedItmsForFactureContext } from '../../../contexts/Contexts';



//----props of checkbox component
interface CustomCheckBoxFactureProps {
    item: ServiceEntity | Article;
  }
  
  //---checkbox component
  const CustomCheckBoxFacture : FC<CustomCheckBoxFactureProps> = ({item})=> {
    const context = useContext(SelectedItmsForFactureContext);
    const  { transformFromItemToLigneFacture, selectedItems, handleItemSelect, removeItemSelect } = context;
    const [checked, setChecked] = useState(false);
  
    useEffect(() => {
      const isSelected = selectedItems.some(
        (selectedItem: { id: number | undefined; type: string; }) =>{
          return  selectedItem.id == item.id && selectedItem.type == ('libelle' in item ? 'service' : 'qte' in item ? 'article' : 'demande')
        }
      );
      setChecked(isSelected);
    }, [selectedItems, item]);
  
  
  
    const handleChange = () => {
      const newCheckedState = !checked;
      setChecked(newCheckedState);
  
      if (newCheckedState) {
        handleItemSelect(item);
        transformFromItemToLigneFacture(item);
        console.log(selectedItems);
      } else {
        removeItemSelect(item);
      }
    };
  
    return (
      <input type="checkbox" checked={checked} onChange={handleChange} />
    );
  }


  export default CustomCheckBoxFacture;