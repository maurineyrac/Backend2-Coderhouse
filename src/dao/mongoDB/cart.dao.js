import MongoDao from "./mongo.dao.js";
import { cartModel } from "./models/cart.model.js";
import { productModel } from "./models/product.model.js";

export default class CartDaoMongo extends MongoDao {
  constructor() {
    super(cartModel);
  }

  getCartById = async (cid) => {
    try {
      return await this.model.findById(cid).populate("products.productID");
    } catch (error) {
      throw new Error(error);
    }
  };


  createCart = async (email) => {
    try {
      return await this.model.create(email);
    } catch (error) {
      throw new Error(error);
    }
  }

  deleteOne = async (cid) => {
    try {
      return await this.model.deleteOne({ _id: cid });
    } catch (error) {
      throw new Error(error);
    }
  };

  addProductToCart = async (cid, pid) => {
    let isInCart = await this.model.findOneAndUpdate(
      { _id: cid, "products.productID": pid },
      { $inc: { "products.$.quantity": 1 } },
      { new: true }
    );
    if (!isInCart) {
      isInCart = await this.model.findByIdAndUpdate(
        cid,
        { $push: { products: { productID: pid, quantity: 1 } } },
        { new: true }
      );
    }
    return isInCart;
  };

  deleteProductFromCart = async (cid, pid) => {
    try {
      return await this.model.findByIdAndUpdate(
        cid,
        { $pull: { products: { productID: pid } } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  updateProductInCart = async (cid, pids) => {
    try {
      return await this.model.findByIdAndUpdate(
        cid,
        { $pull: { products: { productID: { $nin: pids } } } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  updateQuantity = async (cid, pid, quantity) => {
    try {
      return await this.model.findOneAndUpdate(
        { _id: cid, "products.productID": pid },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
      );
    }
    catch (error) {
      throw new Error(error);
    }

  };

  deleteAllProductsFromCart = async (cid) => {
    try {
      return await this.model.findByIdAndUpdate(
        cid,
        { products: [] },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  // purchaseCart = async (cid) => {
  //   try {
  //     const cart = await this.model.findById(cid).populate("products.productID");
  //     console.log('cart en purchaseCart',cart);
  //     let totalCart = 0;
  //     for (const product of cart.products) {
  //       const prod = await productModel.findById(product.productID);
  //       totalCart += Number(prod.price) * Number(product.quantity);
  //     }
  //     console.log('total en purchaseCart',totalCart);
  //     return amount;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };
  purchaseCart = async (cid) => {
    try {
      const cart = await this.model.findById(cid).populate("products.productID");
      if (!cart) throw new Error("Cart not found");

      // Estructuramos los datos del carrito para incluir detalles de productos
      const productsDetails = cart.products.map(item => ({
        productID: item.productID._id,
        quantity: item.quantity,
        stock: item.productID.stock,
        price: item.productID.price,
      }));

      return productsDetails;
    } catch (error) {
      throw new Error(`Error retrieving cart: ${error.message}`);
    }
  };

}
