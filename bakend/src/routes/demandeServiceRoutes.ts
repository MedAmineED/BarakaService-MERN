import { Router } from 'express';
import {
    createDemandeService,
    getAllDemandeServices,
    getDemandeServiceById,
    updateDemandeService,
    deleteDemandeService
} from '../controllers/DemandeServiceController';

const demandeServiceRoutes = Router();

demandeServiceRoutes.post('/', createDemandeService);
demandeServiceRoutes.get('/', getAllDemandeServices);
demandeServiceRoutes.get('/:id', getDemandeServiceById);
demandeServiceRoutes.put('/:id', updateDemandeService);
demandeServiceRoutes.delete('/:id', deleteDemandeService);

export default demandeServiceRoutes;
