import MongoDao from "./mongo.dao.js";
import { productModel } from "./models/product.model.js";

export default class ProductDaoMongo extends MongoDao {
  constructor() {
    super(productModel);
  }
}