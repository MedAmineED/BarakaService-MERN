import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
    AllowNull,
    Default
} from "sequelize-typescript";
import DemandeService from "./DemandeService";
import { Sequelize } from "sequelize";

@Table({
    timestamps: false,
    tableName: "tpaiement", // Adjust the table name if necessary
    modelName: "Paiement"
})
class Paiement extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_p: number;

    @ForeignKey(() => DemandeService)
    @Column(DataType.INTEGER)
    declare demande_srv: number;

    @Column({
        type: DataType.DATEONLY,  
        defaultValue: Sequelize.literal('CURRENT_DATE'),
    })
    declare date_payement: Date;


    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare numero_cheque?: string;

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    declare date_cheque?: Date;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare banque?: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    declare payer: boolean;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false
    })
    declare montant: number;

    // Associations
    @BelongsTo(() => DemandeService)
    declare demandeService: DemandeService;

}

export default Paiement;

