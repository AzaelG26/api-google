import {Request, Response} from 'express';
import PersonalData from "../../database/models/personalData";

const personalData = async (req: Request, res: Response) => {
    try {
        const {name, last_name, age, address, user_id} = req.body;
        if (!name || !last_name || !age || !address || !user_id) {
            res.status(400).json({message:'All fields are required'});
            return;
        }
        const existingUser = await PersonalData.findOne({where: {user_id: user_id}});
        if (existingUser) {
            res.status(400).json({message:'User already has personal data'});
            return;
        }
        const createPersonalData = await PersonalData.create({
            name,
            last_name,
            age,
            address,
            user_id
        });
        res.status(200).json({message: 'Personal data created successfully'});
    }catch(e) {
        res.status(500).json({message: 'Internal server error', e,});
    }
}
export {personalData};
