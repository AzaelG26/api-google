import User from './user.js';
import Order from './order.js';
import Product from './product.js';
import Order_detail from './order_detail.js';
import personalData from "./personalData";
import sequelize from 'sequelize';

User.belongsTo(Order, { foreignKey: 'user_id' });
Order.hasMany(User, { foreignKey: 'user_id' });
Order.belongsToMany(Product, { through: Order_detail });
Product.belongsToMany(Order, { through: Order_detail });
User.hasOne(personalData, { foreignKey: 'user_id' });
personalData.belongsTo(User, { foreignKey: 'user_id' });

