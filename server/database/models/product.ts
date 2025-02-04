import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Product extends Model {
    public id!: number;
    public name!: string;
    public category!: string;
    public price!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Product.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
        category:{
            type: DataTypes.ENUM,
            values: ['men', 'women', 'children'],
            allowNull: false
        },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    price:{
        type: DataTypes.INTEGER,
    },
    createdAt: {
        type: DataTypes.DATE,

        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    }
},
    {
    sequelize,
    modelName: 'Product',
    tableName: 'products'
    });

export default Product;