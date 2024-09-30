import { Request, Response } from 'express';
import Facture from '../models/Facture';
import LigneFacture from '../models/LigneFacture';
import sequelizeConnexion from '../DBconfig/ConnexionDB';
import { Op } from 'sequelize';

// Create a Facture
export const createFacture = async (req: Request, res: Response) => {
    const transaction = await sequelizeConnexion.transaction();

    try {
        let factNum = 1;
        const now = new Date();
        const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        const dateTime = `${date}`;

        const currentYear: number = parseInt(dateTime.split('-')[0]);

        const latestFacture = await Facture.findOne({
            order: [['id_fact', 'DESC']], // Order by primary key (or timestamp) to get the last added
        });
        if(latestFacture){
            const factureYear: number = parseInt(((latestFacture as Facture).date_facture + "").split('-')[0].split(' ')[3]) || 0;
            
            
            if((currentYear - factureYear) == 0){
                const latestFactNum = parseInt(latestFacture?.num_fact.split('/')[0] as string) || 0;
                factNum = latestFactNum + 1;
            }else {
                factNum = 1;
            }
        }

        const { ligneFacture, ...factureData } = req.body;
        
        if (!ligneFacture || ligneFacture.length === 0) {
            console.log({ error: 'LigneFacture cannot be empty' });
            return res.status(400).json({ error: 'LigneFacture cannot be empty' });
        }

        // Create Facture without including LigneFacture initially
        const facture = await Facture.create(
            { ...factureData, date_facture: dateTime, num_fact: `${factNum + "/" + currentYear}` },
            { transaction }
        );

        // Add LigneFactures
        for (const ligne of ligneFacture) {
            ligne.id_fact = facture.id_fact; // Set foreign key
            await LigneFacture.create(ligne, { transaction });
        }

        await transaction.commit();
        res.status(201).json(facture);
    } catch (error) {
        await transaction.rollback();
        console.log({ error: 'Failed to create facture', details: error });
        res.status(500).json({ error: 'Failed to create facture', details: error });
    }
};


export const getLatestNumberOfFactures = async (req: Request, res: Response) => {
    try {
        const latestFacture = await Facture.findOne({
            order: [['id_fact', 'DESC']], // Order by primary key (or timestamp) to get the last added
        });
            res.status(200).json({latestnumber : parseInt((latestFacture?.num_fact)?.split('/')[0] as string)});
    } catch (error) {
        console.log({ error: 'Failed to fetch latest number of factures', details: error });
        res.status(500).json({ error: 'Failed to fetch latest number of factures', details: error });
    }
};

// Get all Factures
export const getAllFactures = async (req: Request, res: Response) => {
    const { searchBy, searchValue, start, rowCpt } = req.query;

    const limit = parseInt(rowCpt as string) || null;
    const offset = parseInt(start as string) || 0;

    try {
        let whereCondition: any = {};

        if (searchBy && searchValue) {
            switch (searchBy) {
                case 'client':
                    whereCondition.client = { [Op.like]: `%${searchValue}%` };
                    break;
                case 'date_facture':
                    whereCondition.date_facture = { [Op.eq]: new Date(searchValue as string) };
                    break;
                case 'prix_ttc':
                    whereCondition.prix_ttc = parseFloat(searchValue as string);
                    break;
                // Add more cases as needed
            }
        }

        // Fetch total count of factures
        const totalCount = await Facture.count({
            where: whereCondition
        });

        // Fetch factures based on the constructed whereCondition
        const factures = await Facture.findAll({
            where: whereCondition,
            limit: limit ? limit : totalCount,
            offset,
            include: [{ model: LigneFacture, as: 'ligneFacture' }]
        });

        const formattedFactures = factures.map(facture => ({
            id_fact: facture.id_fact,
            date_facture: facture.date_facture,
            client: facture.client,
            id_dem: facture.id_dem,
            pht: facture.pht,
            num_fact : facture.num_fact,
            tax: facture.tax,
            remise_total: facture.remise_total,
            timbre_fiscal: facture.timbre_fiscal,
            prix_ttc: facture.prix_ttc,
            ligneFacture: facture.ligneFacture
        }));

        res.json({ factureList: formattedFactures, totalCount });
    } catch (error) {
        console.error('Error fetching factures:', error);
        res.status(500).json({ error: 'An error occurred while fetching factures' });
    }
};

// Get a single Facture by ID
export const getFactureById = async (req: Request, res: Response) => {
    try {
        const facture = await Facture.findByPk(req.params.id, {
            include: [{ model: LigneFacture, as: 'ligneFacture' }] // Include associations if needed
        });
        if (facture) {
            res.status(200).json(facture);
        } else {
            res.status(404).json({ error: 'Facture not found' });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Failed to fetch facture' });
    }
};


export const getFactureByDemId = async (req: Request, res: Response) => {
    try {
        const facture = await Facture.findOne({
            where: { id_dem: req.params.id },
            include: [{ model: LigneFacture, as: 'ligneFacture' }]
        });
        res.status(200).json(facture);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Failed to fetch facture' });
    }
};

// Update a Facture by ID
export const updateFacture = async (req: Request, res: Response) => {
    try {
        const [updated] = await Facture.update(req.body, {
            where: { id_fact: req.params.id }
        });
        if (updated) {
            const updatedFacture = await Facture.findByPk(req.params.id);
            res.status(200).json(updatedFacture);
        } else {
            res.status(404).json({ error: 'Facture not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update facture' });
    }
};

// Delete a Facture by ID
export const deleteFacture = async (req: Request, res: Response) => {
    try {
        const deleted = await Facture.destroy({
            where: { id_fact: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Facture not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete facture' });
    }
};

