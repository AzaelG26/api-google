import express from 'express';
import {getProduct} from "../controllers/productsController";
import {createProduct} from "../controllers/productsController";
import {passportConfig} from '../../auth';
import passport from "passport";
passportConfig(passport);

const router = express.Router();
router.get('/catalog', passport.authenticate('jwt', {session:false}) , getProduct);
router.post('/createProduct', passport.authenticate('jwt', {session:false}) , createProduct);
export default router;