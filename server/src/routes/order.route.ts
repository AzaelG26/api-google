import express from 'express';
import {createOrderController} from "../controllers/order.controller";


const router = express.Router();

router.post('/createOrder', createOrderController);

export default router;