
export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getAllCarts() {
    try {
      return await this.dao.getAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartById(cid) {
    try {
      return await this.dao.getCartById(cid);
    } catch (error) {
      throw new Error(error);
    }
  }

  async create() {
    try {
      return await this.dao.create();
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCart(email) {
    try {
      return await this.dao.createCart(email);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteOne(cid) {
    try {
      return await this.dao.deleteOne({ _id: cid });
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProductToCart(cid, pid) {
    try {
      return await this.dao.addProductToCart(cid, pid);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProductFromCart(cid, pid) {
    try {
      return await this.dao.deleteProductFromCart(cid, pid);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateQuantity(cid, pid, quantity) {
    try {
      return await this.dao.updateQuantity(cid, pid, quantity);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAllProductsFromCart(cid) {
    try {
      return await this.dao.deleteAllProductsFromCart(cid);
    } catch (error) {
      throw new Error(error);
    }
  }
}