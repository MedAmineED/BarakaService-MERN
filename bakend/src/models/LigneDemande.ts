import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo
} from "sequelize-typescript";
import DemandeService from "./DemandeService";


@Table({
    tableName: "tlignedemande",
    modelName: "LigneDemande"
})
class LigneDemande extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_ligne: number;

    @ForeignKey(() => DemandeService)
    @Column(DataType.INTEGER)
    declare demande_srv: number;


    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare type: string;

    @Column(DataType.STRING)
    declare categorie: string;

    @Column(DataType.INTEGER)
    declare element?: number;


    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare reference: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare designation: string;

    @Column({
        type: DataType.DOUBLE,
        allowNull: true
    })
    declare prix: number;

    @Column({
        type: DataType.DOUBLE,
        allowNull: true
    })
    declare tva: number;

    @Column({
        type: DataType.DOUBLE,
        allowNull: true
    })
    declare remise: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare quantite: number;

    // Associations
    @BelongsTo(() => DemandeService, { as: 'demandeService', foreignKey: 'demande_srv' })
    declare demandeService: DemandeService;

}

export default LigneDemande;
