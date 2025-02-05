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

const getProductFromCart = async (req: Request, res: Response) => {
    const {id} = req.body;
    if(!id || !Array.isArray(id) || id.length === 0){
        res.status(400).json({message: 'Missing required fields'});
        return;
    }
    try{
        const products = await Product.findAll({where: {id: id}});
        if(!products || products.length === 0){
            res.status(404).json({message: 'Product not found'});
            return;
        }

        res.status(200).json({products: products});
    }catch(err){
        res.status(500).json({message: 'Something went wrong'});
    }
};

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
            message: "Algo salió mal al crear el producto" + err,
            error: err instanceof Error ? err.message : JSON.stringify(err)
        });

    }
};

export { getProduct, getProductFromCart, createProduct };