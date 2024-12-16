import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: {
    type: Array,
    default: []
  },
  code: Number,
  stock: Number,
  category: String,
  status: {
    type: Boolean,
    default: true
  }
})

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);