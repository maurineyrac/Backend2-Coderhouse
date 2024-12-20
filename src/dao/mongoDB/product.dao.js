import MongoDao from "./mongo.dao.js";
import { productModel } from "./models/product.model.js";

export default class ProductDaoMongo extends MongoDao {
  constructor() {
    super(productModel);
  }

  getAllProducts = async (query, options) => {
    try {
      return await this.model.paginate(query, options);
    } catch (error) {
      throw new Error(error);
    }
  };
}

