import { Router } from 'express';
import {
    createPaiement,
    getAllPaiements,
    getPaiementById,
    updatePaiement,
    deletePaiement,
    getPaiementSum,
    paiementOperation
} from '../controllers/PaiementController';

const paiementRoutes = Router();

paiementRoutes.post('/', createPaiement);
paiementRoutes.get('/', getAllPaiements);
paiementRoutes.get('/sum/:id', getPaiementSum);
paiementRoutes.post('/paimentoperation/:id', paiementOperation);
paiementRoutes.get('/:id', getPaiementById);
paiementRoutes.put('/:id', updatePaiement);
paiementRoutes.delete('/:id', deletePaiement);

export default paiementRoutes;
