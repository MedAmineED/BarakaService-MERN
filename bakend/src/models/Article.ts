import { DoubleDataType } from "sequelize";
import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    BeforeCreate,
    HasMany,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo
 } from "sequelize-typescript";
import Famille from "./Famille";


 @Table ({timestamps : true, tableName : "tarticle", modelName : "Article"})
 class Article extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
            type : DataType.INTEGER})
    declare id : number;
    

    @Column({
        type : DataType.STRING,
        unique: true
    })
    declare identification : string;

    @Column({
        type : DataType.STRING
    })
    declare designation : string;

    @Column({
        type : DataType.INTEGER
    })
    declare qte : number;
    @Column({
        type : DataType.INTEGER
    })
    declare qte_min : number;
    @Column({
        type : DataType.INTEGER
    })
    declare qte_max : number;

    @Column({
        type : DataType.DOUBLE
    })
    declare prix_achat : DoubleDataType;

    @Column({
        type : DataType.DOUBLE
    })
    declare prix_vente : DoubleDataType;

    @Column({
        type : DataType.DOUBLE
    })
    declare tva : DoubleDataType;

    @Column({
        type : DataType.INTEGER,
        defaultValue: 1
    })
    declare etat : number;

    @Column({
        type : DataType.INTEGER,
        defaultValue: 0,
    })
    declare inventaire : number;

    @Column({
        type : DataType.INTEGER
    })
    declare annee : number;  

    @ForeignKey(() => Famille)
    @Column(DataType.INTEGER)
    declare familleId: number;

    @BelongsTo(() => Famille)
    declare famille: Famille;
 }

 export default Article;
