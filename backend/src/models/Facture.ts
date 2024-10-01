import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasMany,
    HasOne,
    Unique
} from "sequelize-typescript";
import LigneFacture from "./LigneFacture";
import DemandeService from "./DemandeService";

@Table({
    timestamps: false, 
    tableName: "tfacture",
    modelName: "Facture"
})
class Facture extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_fact: number;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare date_facture: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare client: string;

    @Unique
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    declare id_dem: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare num_fact: string | null;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false
    })
    declare pht: number;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false
    })
    declare tax: number;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false
    })
    declare remise_total: number;


    @Column({
        type: DataType.DOUBLE,
        allowNull: false
    })
    declare timbre_fiscal: number;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false
    })
    declare prix_ttc: number;

    @HasMany(() => LigneFacture, { as: 'ligneFacture', foreignKey: 'id_fact' })
    declare ligneFacture: LigneFacture[];

    @HasOne(() => DemandeService, { foreignKey: 'id_dem' }) // One-to-one relation
    declare demandeService: DemandeService; // Declare the relation

}

export default Facture;
