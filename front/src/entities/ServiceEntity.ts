interface ServiceEntity {
    id?: number;
    categorieid: number;
    libelle: string;
    pu: number;
    remise: number;
    categorie?: string; // Optional, since it's a BelongsTo association
}

export default ServiceEntity;