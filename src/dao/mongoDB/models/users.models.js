import { Schema, model } from "mongoose";

const userCollection = "users";

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: {
  type: String,
  unique: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "carts",
    default: null
  },
  role : {
    type: String,
    default: "user"
  }
});

export const userModel = model(userCollection, userSchema);



