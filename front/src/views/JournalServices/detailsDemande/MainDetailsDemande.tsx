import React, { FC } from 'react'
import CalculateDemandeServiceContext from '../../../contexts/CalculateDemandeServiceContext'
import { Outlet } from 'react-router-dom'



//------------------------------------------------------------------
// this component is not used in the project it is safe to delete it
//-------------------------------------------------------------------


const MainDetailsDemande: FC = () => {
  return (
 <CalculateDemandeServiceContext>
    <Outlet/>
 </CalculateDemandeServiceContext>
  )
}

export default MainDetailsDemande;
