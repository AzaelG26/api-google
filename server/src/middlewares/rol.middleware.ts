import {Request, Response, NextFunction} from "express";
import User_rol from "../../database/models/user_rol";
import Role from "../../database/models/roles";
const roleMiddleware = (role: string) => {

    return async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        const rol = await Role.findOne({where: {rol_name: role}});
        if (!rol) {
            res.status(401).json({message:'Role Not Found'});
            return;
        }

        if (!user) {
            res.status(401).json({message:"No user found"});
            return
        }

        const rol_user = await User_rol.findOne({where: {user_id: user.id}})
        if (!rol_user) {
            res.status(401).json({message:"User has not role"});
            return
        }

        const rolFormated = rol.id.toString();
        if (rol_user.rol_id == rolFormated) {
            next();
            return;
        }
        res.status(401).json({message:"You Aren´t authorization required"});
    }
}

export {roleMiddleware};
