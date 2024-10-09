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
                const latestFactNum = parseInt(latestFacture?.num_fact?.split('/')[0] as string) || 0;
                factNum = latestFactNum + 1;
            }else {
                factNum = 1;
            }
        }

        const { ligneFacture, ...factureData } = req.body;
        
        if (!ligneFacture || ligneFacture.length === 0) {
            res.status(400).json({ error: 'LigneFacture cannot be empty' });
            return;
        }

        // Create Facture without including LigneFacture initially
        const facture = await Facture.create(
            { ...factureData, num_fact: `${factNum + "/" + currentYear}` },
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
    const { searchBy, searchValue, start, rowCpt, startDate, endDate } = req.query;

    const limit = parseInt(rowCpt as string) || null;
    const offset = parseInt(start as string) || 0;

    try {
        let whereCondition: any = {};

        // Add search conditions if provided
        if (searchBy && searchValue) {
            console.log("Performing search on:", searchBy, "with value:", searchValue);
            switch (searchBy) {
                case 'num_fact':
                    whereCondition.num_fact = { [Op.like]: `%${searchValue}%` };
                    break;
                case 'prix_ttc':
                    whereCondition.prix_ttc = parseFloat(searchValue as string);
                    break;
                // Add more cases as needed
                default:
                    console.warn(`Invalid searchBy value: ${searchBy}`);
            }
        }

        // Handle date range filtering
        if (startDate && endDate) {
            whereCondition.date_facture = {
                [Op.between]: [new Date(startDate as string), new Date(endDate as string)]
            };
        } else if (startDate) {
            whereCondition.date_facture = new Date(startDate as string);
        }

        // Fetch total count of factures
        const totalCount = await Facture.count({
            where: whereCondition
        });

        // Fetch factures based on the constructed whereCondition
        const factures = await Facture.findAll({
            where: whereCondition,
            limit: limit || totalCount,
            offset,
            include: [{ model: LigneFacture, as: 'ligneFacture' }]
        });

        // Format the response
        const formattedFactures = factures.map(facture => ({
            id_fact: facture.id_fact,
            date_facture: facture.date_facture,
            client: facture.client,
            id_dem: facture.id_dem,
            pht: facture.pht,
            num_fact: facture.num_fact,
            tax: facture.tax,
            remise_total: facture.remise_total,
            timbre_fiscal: facture.timbre_fiscal,
            prix_ttc: facture.prix_ttc,
            ligneFacture: facture.ligneFacture
        }));
        res.json({ factureList: formattedFactures, totalCount });
    } catch (error) {
        console.error('Error fetching factures:', error);
        res.status(500).json({ error: 'An error occurred while fetching factures', details: error });
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
    const transaction = await sequelizeConnexion.transaction();

    try {
        const { id, ligneFacture, ...factureData } = req.body;

        console.log("id === ", id);
        // Check if the Facture exists
        const facture = await Facture.findByPk(id);
        if (!facture) {
            console.log("fact not found");
            return res.status(404).json({ error: 'Facture not found' });
        }

        // Update the Facture details
        await facture.update(factureData, { transaction });

        // Handle LigneFacture updates
        const existingLigneFactures = await LigneFacture.findAll({ where: { id_fact: id } });

        console.log('old :');
        console.log(existingLigneFactures);
        console.log("new :");
        console.log(ligneFacture);

        // Remove LigneFactures that are not present in the new data
        for (const existingLigne of existingLigneFactures) {
            if (!ligneFacture.some((lf: LigneFacture) => lf.id === existingLigne.id)) {
                console.log("destroy " + existingLigne.id);
                await existingLigne.destroy({ transaction });
            }
        }

        // Add or Update LigneFactures
        for (const ligne of ligneFacture) {
            console.log(ligne);
            if (ligne.id) {
                // Update existing LigneFacture
                const existingLigne = await LigneFacture.findByPk(ligne.id);
                if (existingLigne) {
                    console.log("update facture is already");
                    await existingLigne.update(ligne, { transaction });
                }
            } else {
                // Add new LigneFacture
                ligne.id_fact = id;
                console.log("create new LigneFacture");
                await LigneFacture.create(ligne, { transaction });
            }
        }

        await transaction.commit();
        console.log("succcccess");
        res.status(200).json({ message: 'Facture updated successfully', facture });
    } catch (error) {
        await transaction.rollback();
        console.error('Failed to update facture:', error);
        res.status(500).json({ error: 'Failed to update facture', details: error });
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

