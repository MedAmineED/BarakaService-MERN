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
import CategorieService from "./CategorieService";
import { deflateRaw } from "zlib";

@Table({
    tableName: "tservices", // Specify the table name if it's different
    modelName: "Service"
})
class Service extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @ForeignKey(() => CategorieService)
    @Column({
        type: DataType.INTEGER,
    })
    declare categorieid: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare libelle: string;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false
    })
    declare pu: number;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false
    })
    declare remise: number;

    @BelongsTo(() => CategorieService)
    declare  categorie : CategorieService;
}

export default Service;
