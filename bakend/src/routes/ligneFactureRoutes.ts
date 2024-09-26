import { Router } from 'express';
import {
    createLigneFacture,
    getAllLigneFactures,
    getLigneFactureById,
    updateLigneFacture,
    deleteLigneFacture
} from '../controllers/LigneFactureController'; // Adjust the import path if necessary

const LigneFactureRoutes = Router();

LigneFactureRoutes.post('/', createLigneFacture);
LigneFactureRoutes.get('/', getAllLigneFactures);
LigneFactureRoutes.get('/:id', getLigneFactureById);
LigneFactureRoutes.put('/:id', updateLigneFacture);
LigneFactureRoutes.delete('/:id', deleteLigneFacture);

export default LigneFactureRoutes;
