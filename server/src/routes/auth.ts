import express from 'express';
import {loginController, registerController} from "../controllers/authController";
import {getProduct} from "../controllers/productsController";
import {passportConfig} from '../../auth';
import passport from "passport";

passportConfig(passport);

const router = express.Router();
router.post('/login', loginController);
router.post('/register', passport.authenticate('jwt', {session:false}), registerController);

export default router;