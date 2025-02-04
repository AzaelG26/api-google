import {Request, Response} from 'express';
import { RequestHandler } from "express";

import  bcrypt from 'bcryptjs';
import  dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from "../../database/models/user";
import {use} from "passport";
import user_rol from "../../database/models/user_rol";
import User_rol from "../../database/models/user_rol";
import Role from "../../database/models/roles";
dotenv.config();

const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user= await User.findOne({where:{email}});

    if(!user){
        res.status(401).json({message:"Invalid email or password"});
        return;
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        res.status(401).json({message:"Invalid password"});
        return;
    }

    const token = jwt.sign({id:user.id, role: '1'},process.env.JWT_SECRET as string,{expiresIn: '1h'});

    res.status(200).json({
        message:'Welcome!',
        token:token
    });
};

const registerController: RequestHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({where:{email}})
    console.log(existingUser);
    if(existingUser){
        res.status(401).json({message:'User already exists'});
        return;
    }
    if(!email || !password){
        res.status(401).json({message: 'Email and password are required'})
        return
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({email, password: hashedPassword});
    const rolName = await Role.findOne({where: {rol_name: 'customer'}});
    if(!rolName){
        res.status(401).json({message:"Rol not found"});
        return;
    }

    const creatingUserRol = await User_rol.create({
        user_id: user.id,
        rol_id: rolName.id,
    })
    res.status(200).json({message:'User created succesfully'});
}

export {loginController, registerController};