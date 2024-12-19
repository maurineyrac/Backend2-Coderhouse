import ProductDaoMongo from "../dao/mongoDB/product.dao.js";
import ProductRepository from "../repositories/product.repository.js";

const productService = new ProductRepository(new ProductDaoMongo());




export default productService;