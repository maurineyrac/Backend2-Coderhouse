import fs from 'fs';
import {v4 as uuidv4} from 'uuid';

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }
  async getAll() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(products);
      } else return [];
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(obj) {

    try {
      const product = {
        ...obj, id: uuidv4()
      }
      const products = await this.getAll();
      const productExist = await this.getById(product.id);
      if(productExist) return null;
      await fs.promises.writeFile(this.path, JSON.stringify(products))
      return products
    } catch (error) {
      throw new Error(error);
    }

  }

  async getById() {
    try {
      const products = await this.getAll();
      const productExist = products.find((product) => product.id === id);
      if (!productExist) return null;
    } catch (error) {
      throw new Error(error);
    }


  }

  async update() {
    try {
      
    } catch (error) {
      throw new Error(error);
    }

  }

  async delete() {
    try {
      
    } catch (error) {
      throw new Error(error);
    }

  }
}