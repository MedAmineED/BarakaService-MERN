import { Router } from 'express';
import {
    createPaiement,
    getAllPaiements,
    getPaiementById,
    updatePaiement,
    deletePaiement,
    getPaiementSum,
    paiementOperation,
    addTimbreFiscal
} from '../controllers/PaiementController';

const paiementRoutes = Router();

paiementRoutes.post('/', createPaiement);
paiementRoutes.get('/', getAllPaiements);
paiementRoutes.get('/sum/:id', getPaiementSum);
paiementRoutes.post('/addtimbre/:id', addTimbreFiscal);
paiementRoutes.post('/paimentoperation/:id', paiementOperation);
paiementRoutes.get('/:id', getPaiementById);
paiementRoutes.put('/:id', updatePaiement);
paiementRoutes.delete('/:id', deletePaiement);

export default paiementRoutes;
