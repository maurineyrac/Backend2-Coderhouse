import MongoDao from "./mongo.dao.js";
import { cartModel } from "./models/cart.model.js";

export default class CartDaoMongo extends MongoDao {
  constructor() {
    super(cartModel);
  }

  getById = async (cid) => {
    try {
      return await this.model.findById(cid).populate("products.productID");
    } catch (error) {

    }
  }

  deleteOne = async (cid) => {
    cart = await cartModel.deleteOne({ _id: cid });
    return cart;
  };

  addProductToCart = async (cid, pid) => {
    let isInCart = await cartModel.findOneAndUpdate({ _id: cid, "products.productID": pid }, { $inc: { "products.$.quantity": 1 } }, { new: true });
    if (!isInCart) {
      isInCart = await cartModel.findByIdAndUpdate(cid, { $push: { products: { productID: pid, quantity: 1 } } }, { new: true });
    }
    return isInCart;
  }

  deleteProductFromCart = async (cid, pid) => {
    updatedCart = await cartModel.findByIdAndUpdate(cid, { $pull: { products: { productID: pid } } }, { new: true });
    return updatedCart;
  }

  updateQuantity = async (cid, pid, quantity) => {
    updatedCart = await cartModel.findOneAndUpdate({ _id: cid, "products.productID": pid }, { $set: { "products.$.quantity": quantity } }, { new: true });
    return updatedCart;
  }

  deleteAllProductsFromCart = async (cid) => {
    updatedCart = await cartModel.findByIdAndUpdate(cid, { products: [] }, { new: true });
    return updatedCart;
  }

}
