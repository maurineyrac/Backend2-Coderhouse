import UserDaoMongo from "../dao/mongoDB/user.dao";
import UserRepository from "../repositories/user.repository";

const userService = new UserRepository(new UserDaoMongo());

export default userService;