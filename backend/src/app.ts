import express, { Express } from "express";
import { Connection } from "./DBconfig/ConnexionDB";
import categorieServiceRoutes from "./routes/categorieServiceRoutes";
import serviceRoutes from "./routes/serviceRoutes";
import demandeServiceRoutes from "./routes/demandeServiceRoutes";
import ligneServicesRoutes from "./routes/LigneDemande";
import paiementRoutes from "./routes/paiementRoutes";
import articleRoutes from "./routes/articleRoutes";
import familleRoutes from "./routes/familleRoutes";
import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes";
import societeRoutes from "./routes/societeRouter";
import factureRoutes from "./routes/factureRoutes";


const app: Express = express();
require('dotenv').config();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Cors Policy
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));


// Register routes
app.use('/api/categories', categorieServiceRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/demande-services', demandeServiceRoutes);
app.use('/api/ligne-services', ligneServicesRoutes);
app.use('/api/paiements', paiementRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/familles', familleRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/facture', factureRoutes);
app.use('/api/societe', societeRoutes);

// Start server
const PORT = process.env.PORT || 3050;


app.listen(PORT, async (): Promise<void> => {
    console.log(`Server is running on port ${PORT}`);
    await Connection(); 
});
