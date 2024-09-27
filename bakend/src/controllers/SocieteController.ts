import { Request, Response } from 'express';
import Societe from '../models/Societe';

// --------- ROUTE {/api/societes}

// Create a Societe
export const createSociete = async (req: Request, res: Response) => {
    try {
        const societe = await Societe.create(req.body);
        res.status(201).json(societe);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create societe' });
    }
};

// Get all Societes
export const getAllSocietes = async (req: Request, res: Response) => {
    try {
        const societes = await Societe.findAll();
        res.status(200).json(societes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch societes' });
    }
};

// Get a single Societe by ID
export const getSocieteById = async (req: Request, res: Response) => {
    try {
        const societe = await Societe.findByPk(req.params.id);
        if (societe) {
            res.status(200).json(societe);
        } else {
            res.status(404).json({ error: 'Societe not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch societe' });
    }
};

// Update a Societe by ID
export const updateSociete = async (req: Request, res: Response) => {
    try {
        const [updated] = await Societe.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedSociete = await Societe.findByPk(req.params.id);
            res.status(200).json(updatedSociete);
        } else {
            res.status(404).json({ error: 'Societe not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update societe' });
    }
};

// Delete a Societe by ID
export const deleteSociete = async (req: Request, res: Response) => {
    try {
        const deleted = await Societe.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Societe not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete societe' });
    }
};
