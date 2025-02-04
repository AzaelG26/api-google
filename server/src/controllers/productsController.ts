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
        const {name, category, price} = req.body;
        if(!name || !category || !price){
            res.status(400).json({message: 'Missing required fields'});
            return
        }
        const newProduct = await Product.create({name, category, price});

        res.status(200).json({
            message: "Product created successfully",
            product: newProduct
        });

    }catch(err){
        // Respuesta bien formada, asegurando que siempre haya un mensaje JSON
        res.status(500).json({
            message: "Algo salió mal al crear el producto",
            error: err instanceof Error ? err.message : JSON.stringify(err)
        });

    }
};

export { getProduct, createProduct };