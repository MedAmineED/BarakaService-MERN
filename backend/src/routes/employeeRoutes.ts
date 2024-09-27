import { Router } from 'express';
import {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} from '../controllers/EmployeeController';
import Employee from '../models/Employee';

const employeeRoutes = Router();

employeeRoutes.post('/', createEmployee);
employeeRoutes.get('/', getAllEmployees);
employeeRoutes.get('/:id', getEmployeeById);
employeeRoutes.put('/:id', updateEmployee);
employeeRoutes.delete('/:id', deleteEmployee);


//---jsut for testing
employeeRoutes.post('/all', async (req, res) => {
    try {
        // Supposons que req.body est un tableau d'employe
        const employe = req.body;  // Il devrait être un tableau d'objets

        // Validez les données si nécessaire

        // Ajoutez tous les employe en une seule requête
        const newEmploye = await Employee.bulkCreate(employe);
        res.status(201).json(newEmploye);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the employe.' });
    }
});

export default employeeRoutes;
