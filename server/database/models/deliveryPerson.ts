// server/database/models/deliveryPerson.ts

import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

class DeliveryPerson extends Model {
    public id!: number;
    public name!: string;
    public phoneNumber!: string;
    public vehicleType!: string;
    public status!: string;
    public currentLocation!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

DeliveryPerson.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        vehicleType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'available',
        },
        currentLocation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'deliveryPersons',
    }
);

export default DeliveryPerson;