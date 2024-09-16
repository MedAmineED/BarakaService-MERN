import { Request, Response } from 'express';
import DemandeService from '../models/DemandeService';
import Paiement from '../models/Paiement';
import LigneDemande from '../models/LigneDemande';
import sequelizeConnexion from '../DBconfig/ConnexionDB';
import { ExecException } from 'child_process';
import { Op } from 'sequelize';
 
// Create a DemandeService
export const createDemandeService = async (req: Request, res: Response) => {
    const transaction = await sequelizeConnexion.transaction();


    try {
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const dateTime = `${date}`;

        const { lignedemande, ...demandeServiceData } = req.body;

        console.log("before check if lignes empty : ", lignedemande);
        // Check if lignedemande is not empty
        if (!lignedemande || lignedemande.length === 0) {
            console.log({ error: 'LigneDemande cannot be empty' })
            return res.status(400).json({ error: 'LigneDemande cannot be empty' });
        }

        // Create DemandeService without including Paiement initially
        const demandeService = await DemandeService.create(
            { ...demandeServiceData, date_demande: dateTime },
            { include: [LigneDemande], transaction }
        );

        // Add LigneDemandes
        for (const ligne of lignedemande) {
            ligne.demande_srv = demandeService.id_dem; // Set foreign key
            await LigneDemande.create(ligne, { transaction });
        }

        await transaction.commit();
        res.status(201).json(demandeService);
    } catch (error) {
        await transaction.rollback();
        // Handle unknown error type
        if (error instanceof Error) {
            console.log({ error: 'Failed to create demandeService', details: error.message })
            res.status(500).json({ error: 'Failed to create demandeService', details: error.message });
        } else {
            console.log({ error: 'Failed to create demandeService' })
            res.status(500).json({ error: 'Failed to create demandeService' });
        }
    }
};

// Get all DemandeServices
export const getAllDemandeServices = async (req: Request, res: Response) => {
    const { searchBy, searchValue, start, rowCpt } = req.query;

    const limit = parseInt(rowCpt as string) || null;
    const offset = parseInt(start as string) || 0;

    try {
        let whereCondition: any = {};

        if (searchBy && searchValue) {
            switch (searchBy) {
                case 'matricule':
                    whereCondition.matricule = { [Op.like]: `%${searchValue}%` };
                    break;
                case 'conducteur':
                    whereCondition.conducteur = { [Op.like]: `%${searchValue}%` };
                    break;
                case 'client':
                    whereCondition.client = { [Op.like]: `%${searchValue}%` };
                    break;
                case 'prix_ttc':
                    whereCondition.prix_ttc = parseFloat(searchValue as string);
                    break;
            }
        }

        // Fetch total count of demandeServices
        const totalCount = await DemandeService.count({
            where: whereCondition
        });

        // Fetch demandeServices based on the constructed whereCondition
        const demandeServices = await DemandeService.findAll({
            where: whereCondition,
            limit: limit ? limit : totalCount,
            offset,
            include: [
                { model: Paiement, as: 'paiements' },
                { model: LigneDemande, as: 'ligneDemandes' }
            ]
        });

        const formattedDemandeServices = demandeServices.map(demande => ({
            id_dem: demande.id_dem,
            date_demande: demande.date_demande,
            matricule: demande.matricule,
            conducteur: demande.conducteur,
            employer: demande.employer,
            heure_deb: demande.heure_deb,
            heure_fin: demande.heure_fin,
            client: demande.client,
            bon_commande: demande.bon_commande,
            prix_ttc: demande.prix_ttc,
            payer: demande.payer,
            marque: demande.marque,
            paiements: demande.paiements,
            ligneDemandes: demande.ligneDemandes
        }));


        res.json({ demandeServiceList: formattedDemandeServices, totalCount });
    } catch (error) {
        console.error('Error fetching demande services:', error);
        res.status(500).json({ error: 'An error occurred while fetching demande services' });
    }
};

// Get a single DemandeService by ID
export const getDemandeServiceById = async (req: Request, res: Response) => {
    console.log("detected ........................................................................")
    try {
        const demandeService = await DemandeService.findByPk(req.params.id, {
            include: [Paiement, LigneDemande] // Include associations if needed
        });
        if (demandeService) {
            res.status(200).json(demandeService);
        } else {
            res.status(404).json({ error: 'DemandeService not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch demandeService' });
    }
};

// Update a DemandeService by ID
export const updateDemandeService = async (req: Request, res: Response) => {
    try {
        const [updated] = await DemandeService.update(req.body, {
            where: { id_dem: req.params.id }
        });
        if (updated) {
            const updatedDemandeService = await DemandeService.findByPk(req.params.id);
            res.status(200).json(updatedDemandeService);
        } else {
            res.status(404).json({ error: 'DemandeService not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update demandeService' });
    }
};

// Delete a DemandeService by ID
export const deleteDemandeService = async (req: Request, res: Response) => {
    try {
        const deleted = await DemandeService.destroy({
            where: { id_dem: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'DemandeService not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete demandeService' });
    }
};
