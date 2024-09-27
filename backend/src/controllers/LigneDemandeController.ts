import { Request, Response } from 'express';
import LigneDemande from '../models/LigneDemande';
import DemandeService from '../models/DemandeService';

// Create a LigneDemande
export const createLigneDemandes = async (req: Request, res: Response) => {
    try {
        const ligneDemandes = await LigneDemande.create(req.body);
        res.status(201).json(ligneDemandes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create ligneDemandes' });
    }
};

// Get all ligneDemande
export const getAllLigneDemandes = async (req: Request, res: Response) => {
    try {
        const ligneDemandes = await LigneDemande.findAll({
            include: [DemandeService] // Include associated DemandeService if needed
        });
        res.status(200).json(ligneDemandes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ligneDemande' });
    }
};

// Get a single LigneDemande by ID
export const getLigneDemandesById = async (req: Request, res: Response) => {
    try {
        const ligneDemandes = await LigneDemande.findByPk(req.params.id, {
            include: [DemandeService] // Include associated DemandeService if needed
        });
        if (ligneDemandes) {
            res.status(200).json(ligneDemandes);
        } else {
            res.status(404).json({ error: 'ligneDemandes not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ligneDemandes' });
    }
};

// Update a ligneDemandes by ID
export const updateLigneDemandes = async (req: Request, res: Response) => {
    try {
        const [updated] = await LigneDemande.update(req.body, {
            where: { id_ligne: req.params.id }
        });
        if (updated) {
            const updatedLigneDemande = await LigneDemande.findByPk(req.params.id);
            res.status(200).json(updatedLigneDemande);
        } else {
            res.status(404).json({ error: 'LigneDemande not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update ligneDemande' });
    }
};

// Delete a LigneDemande by ID
export const deleteLigneDemandes = async (req: Request, res: Response) => {
    try {
        const deleted = await LigneDemande.destroy({
            where: { id_ligne: req.params.id }
        });
        if (deleted) { 
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'LigneDemande not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete ligneDemande' });
    }
};
