import {Request, Response} from 'express';

import Product from '../../database/models/product';
import Order_detail from "../../database/models/order_detail";
import order from '../../database/models/order'
import users from '../../database/models/user'
import PersonalData from "../../database/models/personalData";
import personalData from "../../database/models/personalData";
import roles from "../../database/models/roles";
import user_rol from "../../database/models/user_rol";
const createOrderController = async (req: Request, res: Response) => {
        const {products, user_id} = req.body;
    const user= await users.findOne({
        where: {id: user_id}
    })

    if(!user){
        res.status(401).json({message:"Invalid email or password"});
        return;
    }
    const personalDataUser = await personalData.findOne({
        where: {user_id: user.id}
    })

    if (!personalDataUser) {
        res.status(401).json({message: 'datos no encontrados'});
        return;
    }

    const userAddress = personalDataUser.address;

    const createOrder = await order.create({
        user_id: user.id,
        address: userAddress,
        total: '0',
    });

    for (const product of products) {
        const idProduct = product.id;
        const findProduct = await Product.findOne({
            where: {id: idProduct}
        })
        if (!findProduct) {
            res.status(401).json({message: 'Product not found'});
            return;
        }
        const detailOrder = await Order_detail.create({
            order_id: createOrder.id,
            product_id: idProduct,
            quantity: product.quantity
        })
    }
    res.status(200).json({message:'Order created'});
}

export {createOrderController};