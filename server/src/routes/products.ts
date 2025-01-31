import express from 'express';
import {getProduct} from "../controllers/productsController";
import {createProduct} from "../controllers/productsController";

const router = express.Router();
router.get('/catalog', getProduct);
router.post('/createProduct', createProduct);
export default router;