import {Request, Response} from 'express';

import order from '../../database/models/order'
import users from '../../database/models/user'
const createOrderController = async (req: Request, res: Response) => {
    const {products, user_id} = req.body;
    const user= await users.findByPk(user_id)

    if(!user){
        res.status(401).json({message:"Invalid email or password"});
        return;
    }

    const userAddress = user

    const createOrder = await order.create({});
    res.status(200).json({message:'Order created'});
}