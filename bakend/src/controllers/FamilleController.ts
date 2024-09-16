import { Request, Response } from 'express';
import Famille from '../models/Famille';
import Article from '../models/Article';



// --------- ROUTE {/api/familles}

// Create a Famille
export const createFamille = async (req: Request, res: Response) => {
    try {
        const famille = await Famille.create(req.body);
        res.status(201).json(famille);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create famille' });
    }
};

// Get all Familles
export const getAllFamilles = async (req: Request, res: Response) => {
    try {
        const familles = await Famille.findAll({
            include: [Article] // Include associated articles if needed
        });
        res.status(200).json(familles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch familles' });
    }
};

// Get a single Famille by ID
export const getFamilleById = async (req: Request, res: Response) => {
    try {
        const famille = await Famille.findByPk(req.params.id, {
            include: [Article] // Include associated articles if needed
        });
        if (famille) {
            res.status(200).json(famille);
        } else {
            res.status(404).json({ error: 'Famille not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch famille' });
    }
};

// Update a Famille by ID
export const updateFamille = async (req: Request, res: Response) => {
    try {
        const [updated] = await Famille.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedFamille = await Famille.findByPk(req.params.id);
            res.status(200).json(updatedFamille);
        } else {
            res.status(404).json({ error: 'Famille not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update famille' });
    }
};

// Delete an Famille by ID
export const deleteFamille = async (req: Request, res: Response) => {
    try {
        const deleted = await Famille.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Famille not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete Famille' });
    }
};