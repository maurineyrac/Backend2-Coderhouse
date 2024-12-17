import { Router } from "express";

import ProductDaoMongo from "../../dao/mongoDB/product.dao.js";

const productDao = new ProductDaoMongo();

const router = Router();
router.get("/", async (req, res) => {
  try {

    const { limit, page, sort = 'asc', category, status = true } = req.query;
    const styles = ["styles.css", "styles2.css"]
    const options = {
      limit: parseInt(limit) || 10,
      page: parseInt(page) || 1,
      sort: { price: sort == 'asc' ? 1 : -1 },
      lean: true
    };

    let query = {};

    if (category) {
      query.category = category;
    }
    if (status) {
      query.status = status;
    }

    const productsDB = await productDao.getAllProducts(query, options);

    const products = productsDB.docs

    // Generar array de páginas
    const pages = [];
    for (let i = 1; i <= productsDB.totalPages; i++) {
      pages.push(i);
    }


    console.log(productsDB);
    
    res.render("index", {
      styles,
      products,
      limit: productsDB.limit,
      totalPages: productsDB.totalPages,
      page: productsDB.page,
      hasPrevPage: productsDB.hasPrevPage,
      hasNextPage: productsDB.hasNextPage,
      prevPage: productsDB.prevPage,
      nextPage: productsDB.nextPage,
      pages
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

export default router;
