import {DataTypes, Model} from "sequelize";
import sequelize from '../db';

class Delivery extends Model{
    public id!: number;
    public user_id!: string;
    public order_id!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Delivery.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    order_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'orders', // Nombre de la tabla de órdenes
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',

    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW

    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
},
    {
    sequelize,
    modelName: 'Deliveries',
    tableName: 'deliveries',
    });


export default Delivery;