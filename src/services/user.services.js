import UserDaoMongo from "../dao/mongoDB/user.dao.js";
import UserRepository from "../repositories/user.repository.js";

const userService = new UserRepository(new UserDaoMongo());

export default userService;