import { Router } from 'express';
import {
    createService,
    getAllServices,
    getServiceById, 
    updateService,
    deleteService
} from '../controllers/ServiceController';
import Service from '../models/Service';

const serviceRoutes = Router();

serviceRoutes.post('/', createService);
serviceRoutes.get('/', getAllServices);
serviceRoutes.get('/:id', getServiceById);
serviceRoutes.put('/:id', updateService);
serviceRoutes.delete('/:id', deleteService);


// Route pour ajouter plusieurs services (just for testing)

serviceRoutes.post('/all', async (req, res) => {
    try {
        // Supposons que req.body est un tableau d'services
        const services = req.body;  // Il devrait être un tableau d'objets

        // Validez les données si nécessaire

        // Ajoutez tous les services en une seule requête
        const newServices = await Service.bulkCreate(services);
        res.status(201).json(newServices);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the services.' });
    }
});

export default serviceRoutes;
