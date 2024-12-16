export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAllUsers = async () => {
    try {
      return await this.dao.getAll();
    } catch (error) {
      throw error;
    }
  };

  getUserById = async (id) => {
    try {
      return await this.dao.getById(id);
    } catch (error) {
      throw error;
    }
  };

  createUser = async (user) => {
    try {
      return await this.dao.create(user);
    } catch (error) {
      throw error;
    }
  };

  updateUser = async (id, user) => {
    try {
      return await this.dao.update(id, user);
    } catch (error) {
      throw error;
    }
  };

  deleteUser = async (id) => {
    try {
      return await this.dao.delete(id);
    } catch (error) {
      throw error;
    }
  };

  getByEmail = async (email) => {
    try {
      return await this.dao.getByEmail(email);
    } catch (error) {
      throw error;
    }
  };

}