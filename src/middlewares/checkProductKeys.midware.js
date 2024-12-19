import { request, response } from "express";
import productService from "../services/product.services.js";


export const checkProductKeys = async (req = request, res = response, next) => {
    try {
        const {id, code} = req.body;

        if (id || id === '') {
            return res.status(403).json({ status: 'Error', msg: 'Updating product ID is not allowed' });
        }
        
        const products = await productService.getAllProducts();

        const productExists = products.docs.map((products) => products.code).includes(code);

        if (productExists) return res.status(400).json({ status: "Error", msg: `El producto con el código ${code} ya existe` });

        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
    
}