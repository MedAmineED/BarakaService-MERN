// import User from "./models/User";

import { Sequelize } from "sequelize-typescript";
import Famille from "../models/Famille";
import Article from "../models/Article";
import Employee from "../models/Employee";
import CategorieService from "../models/CategorieService";
import Service from "../models/Service";
import User from "../models/User";
import DemandeService from "../models/DemandeService";
import LigneServices from "../models/LigneDemande";
import Paiement from "../models/Paiement";
import Societe from "../models/Societe";

// const { Seq } = require('sequelize');
// const User = require('../models/User');
// const userModel = require('../models/User');
require('dotenv').config();
const sequelizeConnexion = new Sequelize({
    logging: false,
    dialect: 'postgres',
    host: process.env.DB_HOST, 
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    models: [ 
              Famille, 
              Article, 
              Employee, 
              CategorieService, 
              Service, 
              User, 
              DemandeService, 
              LigneServices, 
              Paiement, 
              Societe,
            ],
  });


export const Connection = async () : Promise<void> => {
    try {
      await sequelizeConnexion.authenticate();
      console.log('DataBase connection has been established successfully.');
      await sequelizeConnexion.sync({ alter: true }); // Sync models
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };
export default sequelizeConnexion;




  