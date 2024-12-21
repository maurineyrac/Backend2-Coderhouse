import { Router } from "express";

import { checkProductData } from '../middleware/checkProductData.midware.js';
import productService from "../../services/product.services.js";
const router = Router();

// Ruta para manejar la carga inicial de productos y el renderizado de la vista
router.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    const updatedProducts = await productService.getAllProducts({}, { limit: parseInt(limit) });

    // req.io.emit('products', updatedProducts);
    const styles = ["styles.css", "styles2.css"]
    res.render("realtimeproducts", { styles, updatedProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

// Ruta para agregar un nuevo producto mediante HTTP POST
router.post('/', checkProductData, async (req, res) => {
  try {
    const product = req.body;
    await productManager.addProduct(product);


    // Emitir el evento a través de Socket.io a todos los clientes
    const updatedProducts = await productManager.getProducts();
    req.io.emit('products', updatedProducts);

    res.status(201).json({ status: 'Success', msg: 'Product added successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Error', msg: 'Internal Server Error' });
  }
});

// Ruta para eliminar un producto mediante HTTP DELETE
router.delete('/', async (req, res) => {
  try {
    const { id } = req.body;
    console.log('Deleting product with id:', id);
    await productManager.deleteProduct((Number(id)));

    // Emitir el evento a través de Socket.io a todos los clientes
    const updatedProducts = await productManager.getProducts();
    req.io.emit('products', updatedProducts);

    res.status(200).json({ status: 'Success', msg: 'Product deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Error', msg: 'Internal Server Error' });
  }
});

export default router;
