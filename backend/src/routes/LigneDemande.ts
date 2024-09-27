import { Router } from 'express';
import {
    createLigneDemandes,
    getAllLigneDemandes,
    getLigneDemandesById,
    updateLigneDemandes,
    deleteLigneDemandes
} from '../controllers/LigneDemandeController';

const LigneDemandesRoutes = Router();

LigneDemandesRoutes.post('/', createLigneDemandes);
LigneDemandesRoutes.get('/', getAllLigneDemandes);
LigneDemandesRoutes.get('/:id', getLigneDemandesById);
LigneDemandesRoutes.put('/:id', updateLigneDemandes);
LigneDemandesRoutes.delete('/:id', deleteLigneDemandes);

export default LigneDemandesRoutes;
