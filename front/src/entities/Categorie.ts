import ServiceEntity from "./ServiceEntity";

interface Categorie {
    id?: number;
    libelle: string;
    ServiceEntitys?: ServiceEntity[]; // Optional if you want to include related articles
}

export default Categorie;