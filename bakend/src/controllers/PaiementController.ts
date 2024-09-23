import { Request, Response } from 'express';
import Paiement from '../models/Paiement';
import DemandeService from '../models/DemandeService';
import { getDemandeServiceById } from './DemandeServiceController';

// Create a Paiement
export const createPaiement = async (req: Request, res: Response): Promise<void>  => {
    try {
        const paiement = await Paiement.create(req.body);
        res.status(201).json(paiement);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create paiement' });
    }
};

export const paiementOperation = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("body ")
        console.log(req.body);
        const id = req.params.id;
        console.log("id : " + id)
        const newPaiement = req.body.montant;
        const paimentSum = await Paiement.sum('montant', {
                                                  where: { demande_srv: req.params.id}
                                              }) || 0;
        console.log("paiement sum : ");
        console.log(paimentSum);
        const requiredPaiment = await DemandeService.findByPk(id,
            { attributes: ["prix_ttc"] }
        );
        console.log("requiredPaiment : ", requiredPaiment?.dataValues.prix_ttc);
        console.log("current paiment : ", (parseFloat(paimentSum+"") + parseFloat(newPaiement+"")));

        if(requiredPaiment && (newPaiement > 0) && (requiredPaiment.dataValues.prix_ttc >= (parseFloat(paimentSum+"") + parseFloat(newPaiement+"")))){
            await DemandeService.update(
                { payer: 
                        requiredPaiment.dataValues.prix_ttc == (parseFloat(paimentSum+"") + parseFloat(newPaiement+"")) ? 
                        1 : 
                        2 },
                { where: { id_dem: id } } // The second argument is the options object
            );
        }
        if(requiredPaiment && (requiredPaiment.dataValues.prix_ttc >= (parseFloat(paimentSum+"") + parseFloat(newPaiement+"")))){
            console.log("detected----")
            const paiement = await Paiement.create(req.body);
            console.log("paiement operatio details :");
            console.log(paiement);
            res.status(201).json(paiement);
        } 
    } catch (error) {
        console.log("error : " + error);
        res.status(500).json({ error: 'Failed to fetch paiement opreration' });
    }
};
 
// Get all Paiements
export const getAllPaiements = async (req: Request, res: Response) => {
    try {
        const paiements = await Paiement.findAll({
            where: { demande_srv: req.params.id}
        });
        res.status(200).json(paiements);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch paiements' });
    }
};

//Get paiement Sum
export const getPaiementSum = async (req: Request, res: Response) => {
    try {
        const paiementSum = await Paiement.sum('montant', {
            where: { demande_srv: req.params.id}
        });
        res.status(200).json(paiementSum? paiementSum : 0);
        return paiementSum? paiementSum : 0;
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch paiement sum' });
    }
}

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
