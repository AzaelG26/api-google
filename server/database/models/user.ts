// database/models/user.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class User extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING(120),
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    }
},{
    sequelize,
    modelName: 'User',
    tableName: 'users'
});


export default User;