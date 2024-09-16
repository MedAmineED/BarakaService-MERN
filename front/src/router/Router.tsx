/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Acceuil from "../views/Accueil/Acceuil";
import ListeArticles from "../views/Articles/ListeArticles";
import ServiceList from "../views/servicesview/ServiceList";
import NavBarCmp from "../components/NavBarCmp";
import { useRoutes, RouteObject } from "react-router-dom";
import EmployeeList from "../views/employee/EmployeeList";
import DemandeService from "../views/demandeservice/DemandeService";
import LoginForm from "../views/login/Login";
import DevisList from "../views/devis/DevisList";
import JournalService from "../views/JournalServices/JournalServices";
import DetailsDemande from "../views/JournalServices/DeatilsDemande";

const Router: React.FC = () => {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <LoginForm/>
    },
    {
      path: "/baraka",
      element: <NavBarCmp />,
      children: [
        {
          path: "/baraka",
          element: <Acceuil />,
        },
        {
          path: "accueil",
          element: <Acceuil />,
        },
        {
          path: "listearticle",
          element: <ListeArticles />,
        },
        {
          path: "listeservice",
          element: <ServiceList />,
        },
        {
          path: "listeemployee",
          element: <EmployeeList />,
        },
        {
          path: "demandeservice",
          element: <DemandeService />,
        },
        {
          path: "journalservice",
          element: <JournalService />,
        },
        {
          path: "detailsDemandeService",
          element: <DetailsDemande />,
        },
        {
          path: "listeDevis",
          element: <DevisList />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
  ];

  return useRoutes(routes);
};

export default Router;
