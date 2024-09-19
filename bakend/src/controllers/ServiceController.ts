import { Request, Response } from 'express';
import Service from '../models/Service';
import CategorieService from '../models/CategorieService';
import { Op } from 'sequelize';

// Create a Service
export const createService = async (req: Request, res: Response) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json(service);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create service' });
    }
};

// Get all Services
export const getAllServices = async (req: Request, res: Response) => {
    const { searchBy, searchValue, start, rowCpt } = req.query;

    const limit = parseInt(rowCpt as string) || null; // Default to null if not provided
    const offset = parseInt(start as string) || 0;

    try {
        let whereCondition: any = {}; // Start with an empty where condition

        if (searchBy && searchValue) {
            switch (searchBy) {
                case 'Libelle':
                    whereCondition.libelle = { [Op.like]: `%${searchValue}%` };
                    break;

                case 'CategorieId':
                    whereCondition.categorieId = searchValue; // Assuming searchValue is the ID
                    break;

                case 'Prix_unitaire':
                    whereCondition.pu = searchValue;
                    break;

                case 'Remise':
                    whereCondition.remise = searchValue;
                    break;

                default:
                    break;
            }
        } 

        // Fetch total count of services
        const totalCount = await Service.count({
            where: { ...whereCondition }
        });

        // Fetch services based on the constructed whereCondition
        const services = await Service.findAll({
            where: whereCondition,
            limit: limit ? limit : totalCount,
            offset,
            include: [
                {
                    model: CategorieService,
                    attributes: ['libelle'] // Include the `libelle` name in the result
                }
            ]
        });

        const formattedServices = services.map(service => ({
            id: service.id,
            libelle: service.libelle,
            pu: service.pu,
            remise: service.remise,
            categorieId: service.categorieid,
            categorie: service.categorie ? service.categorie.libelle : null // Access the 'libelle' attribute from the included CategorieService
        }));

        res.json({ serviceList: formattedServices, totalCount });
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ error: 'An error occurred while fetching services' });
    }
};

// Get a single Service by ID
export const getServiceById = async (req: Request, res: Response) => {
    try {
        const service = await Service.findByPk(req.params.id, {
            include: [CategorieService] // Include associated CategorieService if needed
        });
        if (service) {
            res.status(200).json(service);
        } else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch service' });
    }
};

// Update a Service by ID
export const updateService = async (req: Request, res: Response) => {
    try {
        const [updated] = await Service.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedService = await Service.findByPk(req.params.id);
            res.status(200).json(updatedService);
        } else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
        console.log("update failed", error);
        res.status(500).json({ error: 'Failed to update service' });
    }
};

// Delete a Service by ID
export const deleteService = async (req: Request, res: Response) => {
    try {
        const deleted = await Service.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
        console.log("failed delete service", error);
        res.status(500).json({ error: 'Failed to delete service' });
    }
};
