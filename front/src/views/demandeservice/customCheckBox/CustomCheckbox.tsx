/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState,  useContext } from 'react'
import ServiceEntity from '../../../entities/ServiceEntity';
import Article from '../../../entities/Article';
import { SelectedItmsContext } from '../../../contexts/Contexts';



//----props of checkbox component
interface CustomChckboxProps {
    item: ServiceEntity | Article;
  }
  
  //---checkbox component
  const CustomCheckbox : FC<CustomChckboxProps> = ({item})=> {
    const context = useContext(SelectedItmsContext);
    const { selectedItems, transformFromItemToLigneDemande, handleItemSelect, removeItemSelect } = context;
    const [checked, setChecked] = useState(false);
  
    useEffect(() => {
      const isSelected = selectedItems.some(
        (selectedItem: { id: number | undefined; type: string; }) =>{
          return  selectedItem.id == item.id && selectedItem.type == ('libelle' in item ? 'service' : 'article')
        }
      );
      setChecked(isSelected);
    }, [selectedItems, item]);
  
  
  
    const handleChange = () => {
      const newCheckedState = !checked;
      setChecked(newCheckedState);
  
      if (newCheckedState) {
        handleItemSelect(item);
        transformFromItemToLigneDemande(item);
      } else {
        removeItemSelect(item);
      }
    };
  
    return (
      <input type="checkbox" checked={checked} onChange={handleChange} />
    );
  }


  export default CustomCheckbox;