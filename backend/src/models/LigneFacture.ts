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
import Facture from "./Facture";

@Table({
    tableName: "tlignefacture",
    modelName: "LigneFacture",
})
class LigneFacture extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @ForeignKey(() => Facture)
    @Column(DataType.INTEGER)
    declare id_fact: number;


    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare reference: string;

    @Column(DataType.STRING)
    declare designation: string;

    @Column(DataType.DOUBLE)
    declare pu: number;

    @Column(DataType.INTEGER)
    declare element: number;


    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare qte: number;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare tva: string;


    @Column({
        type: DataType.DOUBLE,
        allowNull: true
    })
    declare remise: number;

    @Column({
        type: DataType.DOUBLE,
        allowNull: true
    })
    declare pht: number;

    @Column({
        type: DataType.DOUBLE,
        allowNull: true
    })
    declare ptt: number;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare typr: string;

    // Associations
    @BelongsTo(() => Facture, { as: 'facture', foreignKey: 'id_fact' })
    declare facture: Facture;

}

export default LigneFacture;
