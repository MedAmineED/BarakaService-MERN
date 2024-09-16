import { Router } from 'express';
import {
    createCategorieService,
    getAllCategorieServices,
    getCategorieServiceById,
    updateCategorieService,
    deleteCategorieService
} from '../controllers/CategorieController';

const categorieServiceRoutes = Router(); 

categorieServiceRoutes.post('/', createCategorieService);
categorieServiceRoutes.get('/', getAllCategorieServices);
categorieServiceRoutes.get('/:id', getCategorieServiceById);
categorieServiceRoutes.put('/:id', updateCategorieService);
categorieServiceRoutes.delete('/:id', deleteCategorieService);

export default categorieServiceRoutes;
