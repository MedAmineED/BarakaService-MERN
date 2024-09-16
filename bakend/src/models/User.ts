import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    BeforeCreate
} from "sequelize-typescript";
import bcrypt from 'bcrypt';

@Table({
    timestamps: false, 
    tableName: "tusers", 
    modelName: "User"
})
class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,  // Assuming login is required
        unique: true       // Assuming login should be unique
    })
    declare login: string;

    @Column({
        type: DataType.STRING,
        allowNull: false  // Assuming pwd is required
    })
    declare pwd: string;


        // Method to hash password before saving
        @BeforeCreate
        static async hashPassword(user: User) {
            if (user.pwd) {
                user.pwd = await bcrypt.hash(user.pwd, 10);
            }
        }
    
        // Method to compare password
        async comparePassword(candidatePassword: string): Promise<boolean> {
            return await bcrypt.compare(candidatePassword, this.pwd);
        }
}

export default User;
