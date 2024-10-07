import { Router } from 'express';
import {
    createFacture,
    getAllFactures,
    getFactureById,
    updateFacture,
    deleteFacture,
    getFactureByDemId,
    getLatestNumberOfFactures
} from '../controllers/FactureController'; // Adjust the import path if necessary

const factureRoutes = Router();

factureRoutes.post('/', createFacture);
factureRoutes.get('/', getAllFactures);
factureRoutes.get('/latestnumber', getLatestNumberOfFactures);
factureRoutes.get('/bydemande/:id', getFactureByDemId);
factureRoutes.get('/:id', getFactureById);
factureRoutes.put('/:id', updateFacture);
factureRoutes.delete('/:id', deleteFacture);

export default factureRoutes;
