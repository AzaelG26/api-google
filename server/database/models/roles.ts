import {DataTypes, Model} from "sequelize";
import  sequelize from '../db'

class Role extends Model {
    public id!: number;
    public rol_name!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Role.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rol_name: {
        type: DataTypes.STRING,
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
    modelName: 'Role',
    tableName: 'roles',
});

export default Role;