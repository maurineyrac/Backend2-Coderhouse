import { request, response } from "express";
import ProductDaoMongo from "../dao/mongoDB/product.dao.js";

const productDao = new ProductDaoMongo();


export const checkProductKeys = async (req = request, res = response, next) => {
    try {
        const {id, code} = req.body;

        if (id || id === '') {
            return res.status(403).json({ status: 'Error', msg: 'Updating product ID is not allowed' });
        }
        
        const products = await productDao.find();

        const productExists = products.find((p) => p.code === code);
        if (productExists) return res.status(400).json({ status: "Error", msg: `El producto con el código ${code} ya existe` });

        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
    
}