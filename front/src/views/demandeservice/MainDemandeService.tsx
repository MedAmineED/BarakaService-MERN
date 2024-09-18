import React, { FC } from 'react';
import MainSelectedContext from '../../contexts/SelectItemsContext';
import DemandeService from './DemandeService';



const MainDemandeService: FC = () => {

  return (
    <MainSelectedContext>
        <DemandeService/> 
    </MainSelectedContext>
  );
};

export default MainDemandeService;
