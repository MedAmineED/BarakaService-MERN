import { Router } from 'express';
import {
    createFacture,
    getAllFactures,
    getFactureById,
    updateFacture,
    deleteFacture,
    getFactureByDemId
} from '../controllers/FactureController'; // Adjust the import path if necessary

const factureRoutes = Router();

factureRoutes.post('/', createFacture);
factureRoutes.get('/', getAllFactures);
factureRoutes.get('/:id', getFactureById);
factureRoutes.get('/bydemande/:id', getFactureByDemId);
factureRoutes.put('/:id', updateFacture);
factureRoutes.delete('/:id', deleteFacture);

export default factureRoutes;
