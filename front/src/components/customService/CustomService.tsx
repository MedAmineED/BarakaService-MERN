import CustomInput from "../customInput/CustomInput";
import CustomModal from "../customModal/CustomModal";
import React, { FC, useContext, useState } from "react";
import { SelectedItmsContext } from "../../contexts/Contexts";



const CustomService : FC = ()=> { 
    const context = useContext(SelectedItmsContext);
    const { transformFromItemToLigneDemande }  = context;

    //input values in one state object
    const [serviceFormData, setServiceFormData] = useState({
        libelle: '',
        prix: 0
    });


    //handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setServiceFormData({...serviceFormData, [e.target.id]: e.target.value });
    }


    const onSave = ()=> {
        transformFromItemToLigneDemande(serviceFormData);
    }

    

    
    return (
    <CustomModal
        title={'Ajouter Service'} 
        textButton={'Ajouter service'} 
        onSave={() =>{onSave()}}
    >
      <div className="d-flex justify-content-center gap-3 align-items-center flex-column">
          <CustomInput
            label="Libelle"
            id="libelle"
            placeholder="nom servcice..."
            value={serviceFormData.libelle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{ handleInputChange(e);}}
          />
          <CustomInput
            label="Prix Service"
            id="prix"
            type='number'
            min={0}
            value={serviceFormData.prix}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{ handleInputChange(e);}}
          />
      </div>
    </CustomModal>
    );
}

export default CustomService;