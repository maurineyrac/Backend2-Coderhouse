export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAllProducts = async () => {
    try {
      return await this.dao.getAllProducts();
    } catch (error) {
      throw error;
    }
  };

  getProductById = async (id) => {
    try {
      return await this.dao.getById(id);
    } catch (error) {
      throw error;
    }
  };

  createProduct = async (product) => {
    try {
      return await this.dao.create(product);
    } catch (error) {
      throw error;
    }
  };

  updateProduct = async (pid, product) => {
    try {
      return await this.dao.update(pid, product);
    } catch (error) {
      throw error;
    }
  };

  deleteProduct = async (pid) => {
    try {
      return await this.dao.delete(pid);
    } catch (error) {
      throw error;
    }
  };
}