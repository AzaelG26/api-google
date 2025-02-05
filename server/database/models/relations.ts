import User from './user.js';
import Order from './order.js';
import Product from './product.js';
import Order_detail from './order_detail.js';
import personalData from "./personalData";
import User_rol from "./user_rol";
import Role from "./roles";

User.belongsTo(Order, { foreignKey: 'user_id' });
Order.hasMany(User, { foreignKey: 'user_id' });
Order.belongsToMany(Product, { through: Order_detail });
Product.belongsToMany(Order, { through: Order_detail });
User.hasOne(personalData, { foreignKey: 'user_id' });
User.hasMany(User_rol, { foreignKey: 'user_id' });
User_rol.belongsTo(User, { foreignKey: 'user_id' });
personalData.belongsTo(User, { foreignKey: 'user_id' });
User_rol.belongsTo(Role, { foreignKey: 'rol_id'});
Role.hasMany(User_rol, { foreignKey: 'rol_id'});

