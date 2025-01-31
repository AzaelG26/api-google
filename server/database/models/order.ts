import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Order extends Model {
    public id!: number;
    public userId!: number;
    public total!: number;
    public address!: string;
    public status!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}
Order.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    user_id:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    status:{
        type: DataTypes.ENUM('pending', 'delivered', 'canceled'),
        allowNull: false,
        defaultValue: 'pending',
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
    }
},
    {
    sequelize,
    modelName: 'Order',
    tableName: 'orders'
    });

export default Order;
