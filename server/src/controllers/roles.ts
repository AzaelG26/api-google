import {Request, Response} from "express";
import Role from "../../database/models/roles";

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

export { createRole };