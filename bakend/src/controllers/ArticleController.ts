import { Request, Response } from 'express';
import Article from '../models/Article';
import Famille from '../models/Famille';
import { Op } from 'sequelize';

// Create an Article
export const createArticle = async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        const article = await Article.create(req.body);
        res.status(201).json(article);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create article' });
    }
};


export const getAllArticles = async (req: Request, res: Response) => {
    const { searchBy, searchValue, start, rowCpt } = req.query;

    const limit = parseInt(rowCpt as string) || null; // Default to 10 if not provided
    const offset = parseInt(start as string) || 0;

    try {
        let whereCondition: any = { etat: 1 };
    
        if (searchBy && searchValue) {
            switch (searchBy) {
                case 'Famille':
                    // Step 1: Find all Famille records with the search value
                    const familles = await Famille.findAll({
                        where: { famille: { [Op.like]: `%${searchValue}%` } }
                    });

                    if (familles.length === 0) {
                        return res.status(404).json({ message: 'No Famille records found' });
                    }

                    // Step 2: Collect all familleIds from the found Famille records
                    const familleIds = familles.map(famille => famille.id);

                    // Step 3: Retrieve all Article records associated with these familleIds
                    whereCondition.familleId = { [Op.in]: familleIds };

                    break;

                case 'Identification':
                    whereCondition.identification = { [Op.like]: `%${searchValue}%` };
                    break;

                case 'Designation':
                    whereCondition.designation = { [Op.like]: `%${searchValue}%` };
                    break;

                case 'Prix_achat':
                    whereCondition.prix_achat = searchValue;
                    break;

                case 'Prix_vente':
                    whereCondition.prix_vente =  searchValue;
                    break;

                default:
                    break;
            }
        }


        // Fetch total count of articles with etat: 1
        const totalCount = await Article.count({
            where: { ...whereCondition }
        });

        // Fetch articles based on the constructed whereCondition
        const articles = await Article.findAll({
            where: whereCondition,
            limit : limit? limit : totalCount,
            offset,
            include: [
                {
                    model: Famille,
                    attributes: ['famille'] // Include the `famille` name in the result
                }
            ]
        });

        const formattedArticles = articles.map(article => ({
            id: article.id,
            identification: article.identification,
            designation: article.designation,
            qte: article.qte,
            qte_min: article.qte_min,
            qte_max: article.qte_max,
            prix_achat: article.prix_achat,
            prix_vente: article.prix_vente,
            tva: article.tva,
            etat: article.etat,
            inventaire: article.inventaire,
            annee: article.annee,
            famille: article.famille ? article.famille.famille : null // Access the 'famille' attribute from the included Famille
        }));

        res.json({articleList : formattedArticles, totalCount});
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'An error occurred while fetching articles' });
    }
};




export const getArticleById = async (req: Request, res: Response) => {
    try {
        const article = await Article.findByPk(req.params.id, {
            include: [{
                model: Famille,
                attributes: ['famille'] // Specify the attributes you want to include
            }]
        });

        if (article) {
            const formattedArticle = {
                id: article.id,
                identification: article.identification,
                designation: article.designation,
                qte: article.qte,
                qte_min: article.qte_min,
                qte_max: article.qte_max,
                prix_achat: article.prix_achat,
                prix_vente: article.prix_vente,
                tva: article.tva,
                etat: article.etat,
                inventaire: article.inventaire,
                annee: article.annee,
                famille: article.famille ? article.famille.famille : null // Include famille name if available
            };

            res.status(200).json(formattedArticle);
        } else {
            res.status(404).json({ error: 'Article not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch article' });
    }
};



export const updateArticle = async (req: Request, res: Response) => {
    try {
        const [updated] = await Article.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedArticle = await Article.findByPk(req.params.id);
            res.status(200).json(updatedArticle);
        } else {
            res.status(404).json({ error: 'Article not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update article' });
    }
};



export const deleteArticle = async (req: Request, res: Response) => {
    try {
        const [updated] = await Article.update(
            { etat: 0 },
            { where: { id: req.params.id } }
        );
        
        if (updated) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Article not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update article etat' });
    }
};
