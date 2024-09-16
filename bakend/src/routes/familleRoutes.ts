import { Router } from 'express';
import {
    createFamille,
    getAllFamilles,
    getFamilleById,
    updateFamille,
    deleteFamille
} from '../controllers/FamilleController';

const familleRoutes = Router();


familleRoutes.post('/', createFamille);
familleRoutes.get('/', getAllFamilles);
familleRoutes.get('/:id', getFamilleById);
familleRoutes.put('/:id', updateFamille);
familleRoutes.delete('/:id', deleteFamille);

export default familleRoutes;
