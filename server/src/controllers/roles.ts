import {Request, Response} from "express";
import {RequestHandler} from "express";
import Role from "../../database/models/roles";
import User from "../../database/models/user";
import User_rol from "../../database/models/user_rol";

const createRole = async (req: Request, res: Response) => {
    try {
        const {rol_name} = req.body;

        const existing = await Role.findOne({where: { rol_name}});
        if (existing) {
            res.status(200).json({message: "Role already exists"});
            return;
        }

        const newRole = await Role.create({rol_name});
        res.status(200).json({
            message: "Role created successfully",
            role: newRole,
        });
        return;

    }catch(err){
        console.log(err);
        res.status(200).json({message: "Interval server error"});
        return;
    }
};

const setRoleUser: RequestHandler = async (req, res): Promise<void> => {
    try{
        const {id} = req.params;
        const user_id = id;
        const {rol_name} = req.body;
        const role = await  Role.findOne({where:{rol_name}})
        if(!role){
            res.status(404).json({message: "Role not found"});
            return;
        }
        const user = await User.findOne({where: {id}})
        if (!user){
            res.status(404).json({message: "User not found"});
            return;
        }

        const existingUserRole = await User_rol.findOne({where:{user_id, rol_id: role.id}});
        if (existingUserRole){
            res.status(200).json({message: "User has this role"})
            return ;
        }
        await User_rol.upsert({
            user_id,
            rol_id: role.id,
        });
         res.status(200).json({ message: "Role assigned successfully" });
         return ;

    }catch (e){
        console.error("Error al asignar el rol al usuario:", e);
        res.status(500).json({ message: "Error interno del servidor" });
        return;

    }
}

export { createRole, setRoleUser };