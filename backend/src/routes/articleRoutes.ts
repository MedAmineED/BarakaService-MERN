import { Router } from 'express';
import {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle
} from '../controllers/ArticleController';
import Article from '../models/Article';

const articleRoutes = Router();

articleRoutes.post('/', createArticle);
articleRoutes.get('/', getAllArticles);
articleRoutes.get('/:id', getArticleById);
articleRoutes.put('/:id', updateArticle);
articleRoutes.delete('/:id', deleteArticle);

// Route pour ajouter plusieurs articles
//------just for testing
articleRoutes.post('/all', async (req, res) => {
    try {
        // Supposons que req.body est un tableau d'articles
        const articles = req.body;  // Il devrait être un tableau d'objets

        // Validez les données si nécessaire

        // Ajoutez tous les articles en une seule requête
        const newArticles = await Article.bulkCreate(articles);
        res.status(201).json(newArticles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the articles.' });
    }
});
export default articleRoutes;
