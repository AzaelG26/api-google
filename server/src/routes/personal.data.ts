import express from 'express';
import {personalData} from "../controllers/personalData";
const router = express.Router();
router.post('/info', personalData );
export default router;