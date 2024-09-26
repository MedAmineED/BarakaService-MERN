import { Request, Response } from 'express';
import LigneFacture from '../models/LigneFacture'; // Import your LigneFacture model
import Facture from '../models/Facture'; // Import your Facture model

// Create a LigneFacture
export const createLigneFacture = async (req: Request, res: Response) => {
    try {
        const ligneFacture = await LigneFacture.create(req.body);
        res.status(201).json(ligneFacture);
    } catch (error) {
        console.error('Failed to create ligneFacture:', error);
        res.status(500).json({ error: 'Failed to create ligneFacture' });
    }
};

// Get all LigneFactures
export const getAllLigneFactures = async (req: Request, res: Response) => {
    try {
        const ligneFactures = await LigneFacture.findAll({
            include: [Facture] // Include associated Facture if needed
        });
        res.status(200).json(ligneFactures);
    } catch (error) {
        console.error('Failed to fetch ligneFactures:', error);
        res.status(500).json({ error: 'Failed to fetch ligneFactures' });
    }
};

// Get a single LigneFacture by ID
export const getLigneFactureById = async (req: Request, res: Response) => {
    try {
        const ligneFacture = await LigneFacture.findByPk(req.params.id, {
            include: [Facture] // Include associated Facture if needed
        });
        if (ligneFacture) {
            res.status(200).json(ligneFacture);
        } else {
            res.status(404).json({ error: 'LigneFacture not found' });
        }
    } catch (error) {
        console.error('Failed to fetch ligneFacture:', error);
        res.status(500).json({ error: 'Failed to fetch ligneFacture' });
    }
};

// Update a LigneFacture by ID
export const updateLigneFacture = async (req: Request, res: Response) => {
    try {
        const [updated] = await LigneFacture.update(req.body, {
            where: { id_ligne_facture: req.params.id } // Change to the correct primary key field
        });
        if (updated) {
            const updatedLigneFacture = await LigneFacture.findByPk(req.params.id);
            res.status(200).json(updatedLigneFacture);
        } else {
            res.status(404).json({ error: 'LigneFacture not found' });
        }
    } catch (error) {
        console.error('Failed to update ligneFacture:', error);
        res.status(500).json({ error: 'Failed to update ligneFacture' });
    }
};

// Delete a LigneFacture by ID
export const deleteLigneFacture = async (req: Request, res: Response) => {
    try {
        const deleted = await LigneFacture.destroy({
            where: { id_ligne_facture: req.params.id } // Change to the correct primary key field
        });
        if (deleted) { 
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'LigneFacture not found' });
        }
    } catch (error) {
        console.error('Failed to delete ligneFacture:', error);
        res.status(500).json({ error: 'Failed to delete ligneFacture' });
    }
};
