import {Request, Response} from 'express';
import  bcrypt from 'bcryptjs';
import  dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from "../../database/models/user";
import {use} from "passport";
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
        message:'Bienvenido',
        token:token
    });
};

const registerController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({where:{email}})
    console.log(existingUser);
    if(existingUser){
        res.status(401).json({message:'User already exists'});
        console.log('ayuda pendejos',existingUser);
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({email, password: hashedPassword});

    res.status(200).json({message:'User creado correctamente'});
}

export {loginController, registerController};