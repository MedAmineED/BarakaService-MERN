import React, { useContext, useEffect, useState } from 'react';
import { SelectedItmsContext } from '../../../contexts/Contexts';
import LigneDemande from '../../../entities/LigneDemande';
import ServiceEntity from '../../../entities/ServiceEntity';
import Article from '../../../entities/Article';


interface TableInputsProps {
    item : ServiceEntity | Article;
    attribute : string;
    defaultValue?: number;
    min?: number;
}

const TableInput: React.FC<TableInputsProps> = ({ item, attribute, defaultValue, min}) => {
    const context = useContext(SelectedItmsContext);
    const { ligneDemandeListe, setLigneDemandeListe } = context;
    const [value, setValue] = useState<number | null>(0);
    const [foundLigneDemande, setFoundListeDemande] = useState<LigneDemande | null>();

    const itemType = (item as ServiceEntity).libelle? 'service' : 'article';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      //----never let the input empty
      if (e.target.value === '') return;
      setValue(parseFloat(e.target.value));
    };

    useEffect(()=>{
        if(defaultValue){
            setValue(defaultValue);
            return;
        }
        setValue(item[attribute]);
    }, [])
    
    //----find ligneDmande has the same id and type
    useEffect(() => {
        const findLigne = ligneDemandeListe.find((ligne: LigneDemande) => ligne.element === item.id && ligne.type === itemType);
        setFoundListeDemande(findLigne);
    },[ligneDemandeListe]);



  useEffect(() => {
    //---update remise of ligneDemande with the new remise Value and set it in the list 
    if (foundLigneDemande && value) {
        if(attribute =="qte"){
            foundLigneDemande.quantite = value;
        }else{
          foundLigneDemande.remise = value;
        }
      setLigneDemandeListe(ligneDemandeListe.map((ligne: LigneDemande) => ligne.element === item.id && ligne.type === itemType? foundLigneDemande : ligne));
    } else {
      setLigneDemandeListe([...ligneDemandeListe]);
    }
  },[value]);

  return (
    <input
      type="number"
      style={{color: 'black', maxWidth: '70px'}}
      min={min? min : 0}
      value={value}
      onChange={(e)=>{handleChange(e);}}
    />
  );
};

export default TableInput;
