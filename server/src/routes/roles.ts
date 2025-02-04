import express from 'express';
import {createRole, setRoleUser} from "../controllers/roles";

const router = express.Router();
router.post('/createRole', createRole);
router.put("/user/:id", setRoleUser);

export default router;
