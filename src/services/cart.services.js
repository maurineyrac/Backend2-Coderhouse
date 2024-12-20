import CartDaoMongo from "../dao/mongoDB/cart.dao.js";
import CartRepository from "../repositories/cart.repository.js";

const cartService = new CartRepository(new CartDaoMongo());

export default cartService;