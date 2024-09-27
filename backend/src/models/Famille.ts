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
    AutoIncrement
 } from "sequelize-typescript";
import Article from "./Article";


 @Table ({timestamps : true, tableName : "tfamille", modelName : "Famille"})
 class Famille extends Model {
    @Column({
            primaryKey : true,
            type : DataType.INTEGER,
            autoIncrement: true})
    declare id : number;
    

    @Column({
        type : DataType.STRING
    })
    declare famille : string; 

    @HasMany(() => Article)
    declare articles: Article[];
 }

 export default Famille;
