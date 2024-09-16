import { Router } from 'express';
import {
    createPaiement,
    getAllPaiements,
    getPaiementById,
    updatePaiement,
    deletePaiement
} from '../controllers/PaiementController';

const paiementRoutes = Router();

paiementRoutes.post('/', createPaiement);
paiementRoutes.get('/', getAllPaiements);
paiementRoutes.get('/:id', getPaiementById);
paiementRoutes.put('/:id', updatePaiement);
paiementRoutes.delete('/:id', deletePaiement);

export default paiementRoutes;
