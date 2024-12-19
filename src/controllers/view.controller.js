import UserDTO from "../dto/user.dto.js";
import productService from "../services/product.services.js";
import userService from "../services/user.services.js";

class ViewController {
  renderProducts = async (req, res) => {
    try {
      const { limit, page, sort = "asc", category, status = true } = req.query;
      const styles = ["styles.css", "styles2.css"];
      const options = {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
        sort: { price: sort == "asc" ? 1 : -1 },
        lean: true,
      };

      let query = {};

      if (category) {
        query.category = category;
      }
      if (status) {
        query.status = status;
      }

      const productsDB = await productService.getAllProducts(query, options);
      const products = productsDB.docs;

      // Generar array de páginas
      const pages = [];
      for (let i = 1; i <= productsDB.totalPages; i++) {
        pages.push(i);
      }

      res.render("products", {
        styles,
        products,
        limit: productsDB.limit,
        totalPages: productsDB.totalPages,
        page: productsDB.page,
        hasPrevPage: productsDB.hasPrevPage,
        hasNextPage: productsDB.hasNextPage,
        prevPage: productsDB.prevPage,
        nextPage: productsDB.nextPage,
        pages,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
  };

  renderSession = async (req, res) => {
    try {
 
      const userDTO = new UserDTO(req.user);
      return res.render("session", { user: userDTO });
    } catch (error) {
      console.error("Error al cargar la vista principal:", error);
      res.render("error", { message: "Error al cargar la vista principal" });
    }
  };

  renderAdmin = async (req, res) => {
    try {
      const userDTO = new UserDTO(req.user);
      return res.render("admin", { user: userDTO });
    } catch (error) {
      console.error('Error al cargar la vista principal:', error);
      res.render('error', { message: 'Error al cargar la vista principal' });
    }
  }

  renderLogin = (req, res) => {
    res.render("login");
  };

  renderRegister = (req, res) => {
    res.render("register");
  };
}

export default ViewController;
