import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    PrimaryKey,
    AutoIncrement
} from "sequelize-typescript";

@Table({ timestamps: true, tableName: "societe", modelName: "Societe" })
class Societe extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare nom: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare adresse: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare tel: string;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;
}

export default Societe;
