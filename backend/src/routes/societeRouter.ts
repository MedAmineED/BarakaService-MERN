import { Router } from 'express';
import {
    createSociete,
    getAllSocietes,
    getSocieteById,
    updateSociete,
    deleteSociete
} from '../controllers/SocieteController';

const societeRoutes = Router();

societeRoutes.post('/', createSociete);
societeRoutes.get('/', getAllSocietes);
societeRoutes.get('/:id', getSocieteById);
societeRoutes.put('/:id', updateSociete);
societeRoutes.delete('/:id', deleteSociete);

export default societeRoutes;
