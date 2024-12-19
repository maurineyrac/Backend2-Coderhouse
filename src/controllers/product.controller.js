import productService from "../services/product.services.js";

class ProductController {
  getAllProducts = async (req, res) => {
    try {
      const { limit, page, sort, category, status } = req.query;

      const options = {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
        sort: { price: sort == "asc" ? 1 : -1 },
        lean: true,
      };

      if (category) {
        const products = await productService.getAllProducts(
          { category },
          options
        );
        return res.status(200).json({ status: "OK", products });
      }
      if (status) {
        const products = await productService.getAllProducts(
          { status },
          options
        );
        return res.status(200).json({ status: "OK", products });
      }

      const products = await productService.getAllProducts({}, options);

      res.status(200).json({ status: "OK", products });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
  };

  getProductById = async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await productService.getProductById(pid);
      res.status(200).json({ status: "OK", product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
  };

  createProduct = async (req, res) => {
    try {
      const product = req.body;

      const products = await productService.getAllProducts();
      const productExists = products.find((p) => p.code === code);

      if (productExists)
        return res.status(400).json({
          status: "Error",
          msg: `El producto con el código ${code} ya existe`,
        });

      const newProduct = await productService.createProduct(product);
      res.status(201).json({ status: "OK", product: newProduct });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const product = req.body;

      const updatedProduct = await productService.updateProduct(pid, product);
      res.status(200).json({ status: "OK", product: updatedProduct });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await productService.deleteProduct(pid);
      res.status(200).json({ status: "OK", product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
  };
}

export default ProductController;
