import { Request, Response } from 'express';
import CategorieService from '../models/CategorieService';

// Create a CategorieService
export const createCategorieService = async (req: Request, res: Response) => {
    try {
        const categorieService = await CategorieService.create(req.body);
        res.status(201).json(categorieService);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create categorieService' });
    }
};

// Get all CategorieServices
export const getAllCategorieServices = async (req: Request, res: Response) => {
    try {
        const categorieServices = await CategorieService.findAll();
        res.status(200).json(categorieServices);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categorieServices' });
    }
};

// Get a single CategorieService by ID
export const getCategorieServiceById = async (req: Request, res: Response) => {
    try {
        const categorieService = await CategorieService.findByPk(req.params.id);
        if (categorieService) {
            res.status(200).json(categorieService);
        } else {
            res.status(404).json({ error: 'CategorieService not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categorieService' });
    }
};

// Update a CategorieService by ID
export const updateCategorieService = async (req: Request, res: Response) => {
    try {
        const [updated] = await CategorieService.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedCategorieService = await CategorieService.findByPk(req.params.id);
            res.status(200).json(updatedCategorieService);
        } else {
            res.status(404).json({ error: 'CategorieService not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update categorieService' });
    }
};

// Delete a CategorieService by ID
export const deleteCategorieService = async (req: Request, res: Response) => {
    try {
        const deleted = await CategorieService.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'CategorieService not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete categorieService' });
    }
};
