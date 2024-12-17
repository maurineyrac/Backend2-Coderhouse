import ProductDaoMongo from "../dao/mongoDB/product.dao";
import ProductRepository from "../repositories/product.repository";

const productService = new ProductRepository(new ProductDaoMongo());

export default productService;