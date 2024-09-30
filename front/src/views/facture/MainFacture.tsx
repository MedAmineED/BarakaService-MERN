import React, { FC } from 'react';
// import MainSelectedContext from '../../contexts/SelectItemsContext';
import FactureEditable from './customFacture/FactureEditable';
import SelectForFactureProvider from '../../contexts/SelectForFactureProvider';



const MainFacture: FC = () => {

  return (
    <SelectForFactureProvider>
        <FactureEditable/> 
    </SelectForFactureProvider>
  );
};

export default MainFacture;
