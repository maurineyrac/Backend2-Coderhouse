import { Router } from "express";
import { checkProductData } from "../../middlewares/checkProductData.midware.js";
import productService from "../../services/product.services.js";
import mongoose from "mongoose";
const router = Router();

// Ruta para manejar la carga inicial de productos y el renderizado de la vista
router.get('/', async (req, res) => {
  try {
    const { limit, page, sort, category, status } = req.query;

    const options = {
      limit: parseInt(limit) || 10,
      page: parseInt(page) || 1,
      // sort: { price: sort == "asc" ? 1 : -1 },
      lean: true,
    };
    const dbProducts = await productService.getAllProducts({}, options);
    const updatedProducts = dbProducts.docs; 
    

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
    await productService.createProduct(product);


    // Emitir el evento a través de Socket.io a todos los clientes
    const dbProducts = await productService.getAllProducts();
    const updatedProducts = dbProducts.docs; 
    console.log(updatedProducts)
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
    console.log('req.body:', req.body);
    console.log('Deleting product with id:', id);

    if (!id || id === 'undefined') {
      return res.status(400).json({ status: 'Error', msg: 'Product ID is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: 'Error', msg: 'Invalid product ID' });
    }

    await productService.deleteProduct(id);
  
    // Emitir el evento a través de Socket.io a todos los clientes
    const dbProducts = await productService.getAllProducts();
    const updatedProducts = dbProducts.docs; 
    req.io.emit('products', updatedProducts);

    res.status(200).json({ status: 'Success', msg: 'Product deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Error', msg: 'Internal Server Error' });
  }
});

export default router;
