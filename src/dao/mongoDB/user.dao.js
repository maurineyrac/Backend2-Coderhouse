import MongoDao from "./mongo.dao.js";
import { userModel } from "./models/user.model.js";


export default class UserDaoMongo extends MongoDao {
  constructor() {
    super(userModel);
  }

  getByEmail = async (email) => {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }
  };

  // getUserById = async (uid) => {
  //   try {
  //     return await this.model.findById(uid).populate("cart");
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };
};
