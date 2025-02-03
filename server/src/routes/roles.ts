import express from 'express';
import {createRole} from "../controllers/roles";

const router = express.Router();
router.post('/createRole', createRole);
export default router;
