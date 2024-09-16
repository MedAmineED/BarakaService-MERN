import { Request, Response } from 'express';
import Employee from '../models/Employee';
import { Op } from 'sequelize';

// Create an Employee
export const createEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create employee' });
    }
};

// Get all Employees
export const getAllEmployees = async (req: Request, res: Response) => {
    const { searchBy, searchValue, start, rowCpt } = req.query;

    const limit = parseInt(rowCpt as string) || null; // Default to 10 if not provided
    const offset = parseInt(start as string) || 0;

    try {
        let whereCondition: any = { etat: 1 };
    
        if (searchBy && searchValue) {
            switch (searchBy) {
                case 'Nom':
                    whereCondition.nom = { [Op.like]: `%${searchValue}%` };
                    break;

                case 'CIN':
                    whereCondition.cin = { [Op.like]: `%${searchValue}%` };
                    break;

                case 'Mobile':
                    whereCondition.mobile = { [Op.like]: `%${searchValue}%` };
                    break;

                case 'Salaire':
                    whereCondition.salaire = searchValue;
                    break;

            }
        }

        // Fetch total count of employees with etat: 1
        const totalCount = await Employee.count({
            where: { ...whereCondition }
        });

        // Fetch employees based on the constructed whereCondition
        const employees = await Employee.findAll({
            where: whereCondition,
            limit : limit? limit : totalCount,
            offset,
        });

        const formattedEmployees = employees.map(employee => ({
            id: employee.id,
            cin: employee.cin,
            nom: employee.nom,
            recrutement: employee.recrutement,
            mobile: employee.mobile,
            salaire: employee.salaire,
            specialite: employee.specialite,
            etat: employee.etat,
        }));

        res.json({ employeeList: formattedEmployees, totalCount });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'An error occurred while fetching employees' });
    }
};

// Get a single Employee by ID
export const getEmployeeById = async (req: Request, res: Response) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch employee' });
    }
};

// Update an Employee by ID
export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const [updated] = await Employee.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedEmployee = await Employee.findByPk(req.params.id);
            res.status(200).json(updatedEmployee);
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update employee' });
    }
};

// Delete an Employee by ID
export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const deleted = await Employee.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete employee' });
    }
};
