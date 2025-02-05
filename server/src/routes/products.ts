import express from 'express';
import {getProduct, getProductFromCart, createProduct} from "../controllers/productsController";
import {passportConfig} from '../../auth';
import {roleMiddleware} from "../middlewares/rol.middleware";
import passport from "passport";
passportConfig(passport);

const router = express.Router();
router.get('/catalog', passport.authenticate('jwt', {session:false}) , roleMiddleware('customer'), getProduct);
router.post('/cart-products', getProductFromCart);
router.post('/createProduct', passport.authenticate('jwt', {session:false}) , createProduct);

export default router;