import { Request, Response } from 'express';
import Paiement from '../models/Paiement';
import DemandeService from '../models/DemandeService';

// Create a Paiement
export const createPaiement = async (req: Request, res: Response) => {
    try {
        const paiement = await Paiement.create(req.body);
        res.status(201).json(paiement);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create paiement' });
    }
};

// Get all Paiements
export const getAllPaiements = async (req: Request, res: Response) => {
    try {
        const paiements = await Paiement.findAll({
            include: [DemandeService] // Include associated DemandeService if needed
        });
        res.status(200).json(paiements);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch paiements' });
    }
};

// Get a single Paiement by ID
export const getPaiementById = async (req: Request, res: Response) => {
    try {
        const paiement = await Paiement.findByPk(req.params.id, {
            include: [DemandeService] // Include associated DemandeService if needed
        });
        if (paiement) {
            res.status(200).json(paiement);
        } else {
            res.status(404).json({ error: 'Paiement not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch paiement' });
    }
};

// Update a Paiement by ID
export const updatePaiement = async (req: Request, res: Response) => {
    try {
        const [updated] = await Paiement.update(req.body, {
            where: { id_p: req.params.id }
        });
        if (updated) {
            const updatedPaiement = await Paiement.findByPk(req.params.id);
            res.status(200).json(updatedPaiement);
        } else {
            res.status(404).json({ error: 'Paiement not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update paiement' });
    }
};

// Delete a Paiement by ID
export const deletePaiement = async (req: Request, res: Response) => {
    try {
        const deleted = await Paiement.destroy({
            where: { id_p: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Paiement not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete paiement' });
    }
};
