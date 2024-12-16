import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        productID: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        quantity: Number,
        _id: false,
      },
    ],
    default: [],
  },
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
