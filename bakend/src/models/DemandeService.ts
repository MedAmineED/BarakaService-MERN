import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasMany,
    HasOne
} from "sequelize-typescript";
import Paiement from "./Paiement";
import LigneDemande from "./LigneDemande";
import Facture from "./Facture";

@Table({
    timestamps: false, 
    tableName: "tdemandeservice",
    modelName: "DemandeService"
})
class DemandeService extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_dem: number;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare date_demande: Date;

    @Column({ 
        type: DataType.STRING,
        allowNull: false
    })
    declare matricule: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare conducteur: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare employer: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare heure_deb: string;  // Use string for TIME data type

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare heure_fin: string;  // Use string for TIME data type

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare client: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare bon_commande: string;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false
    })
    declare prix_ttc: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare payer: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare marque: string;

    @HasMany(() => Paiement)
    declare paiements: Paiement[];

    @HasOne(() => Facture, { foreignKey: 'id_dem' }) 
    declare facture: Facture; 
    
    @HasMany(() => LigneDemande, { as: 'ligneDemandes', foreignKey: 'demande_srv' })
    declare ligneDemandes: LigneDemande[];
}

export default DemandeService;
