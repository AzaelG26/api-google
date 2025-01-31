import { Request, Response } from 'express';
import Product from "../../database/models/product";

const getProduct = async (req: Request, res: Response) => {
    try{
        const products = await Product.findAll();
        res.status(200).json(products);
        return;

    }catch(err){
        res.status(500).json({message:'Something went wrong'});
        return;
    }
}

const createProduct = async (req: Request, res: Response) => {
    try{
        const item = req.body;
        if(!item){
            res.status(400).json({message:'Product required'});
            return
        }
        const newProduct = await Product.create(item);
        res.status(200).json({
            message: "Product created successfully",
            product: newProduct
        });

    }catch(err){
        res.status(500).json({message:'Something went wrong'});

    }
};

export { getProduct, createProduct };