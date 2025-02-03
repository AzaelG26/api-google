import {DataTypes, Model} from "sequelize";
import sequelize from '../db';

class User_rol extends Model {
    public id!: number;
    public user_id!: string;
    public rol_id!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

User_rol.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rol_id: {
        type: DataTypes.INTEGER,
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
    modelName: "User_rol",
    tableName: "user_rol",
})

export default User_rol;