import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Order_detail extends Model {
    public id!: number;
    public orderId!: number;
    public productId!: number;
    public quantity!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Order_detail.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    order_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'id',
        },
    },
    product_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id',
        },
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
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
    modelName: 'Order_detail',
    tableName: 'order_details'
    });

export default Order_detail;