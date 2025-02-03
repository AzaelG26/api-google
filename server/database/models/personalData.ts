import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class PersonalData extends Model {
    id!: string;
    user_id!: string;
    name!: string;
    last_name!: string;
    address!: string;
}

PersonalData.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
    {
        sequelize,
        modelName: 'personalData',
        tableName: 'personal_data',
    })


export default PersonalData;