import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement
} from "sequelize-typescript";

@Table({
    tableName: "temployee", // Specify the table name if it's different
    modelName: "Employee"
})
class Employee extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Column({
        type: DataType.STRING(12),
        unique : true
    })
    declare cin: string;

    @Column({
        type: DataType.STRING(75),
        allowNull : false
    })
    declare nom: string;

    @Column({
        type: DataType.DATE,
        allowNull : false
    })
    declare recrutement: Date;

    @Column({
        type: DataType.STRING(12),
        allowNull : false
    })
    declare mobile: string;

    @Column({
        type: DataType.DOUBLE,
    })
    declare salaire: number;

    @Column({
        type: DataType.INTEGER,
    })
    declare specialite: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue : 1
    })
    declare etat: number;
}

export default Employee;