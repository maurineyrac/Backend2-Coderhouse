import cartService from "../services/cart.services.js";

class CartController {
  getAllCarts = async (req, res) => {
    try {
      const carts = await cartService.getAllCarts();
      res.status(200).json({ status: "OK", carts });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
  };

  getCart = async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cartService.getCartById(cid);
      if (!cart)
        return res.status(404).json({ status: "Error", msg: "Cart not found" });

      res.status(200).json({ status: "OK", cart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
  };

  createCart = async (req, res) => {
    try {
      const newCart = await cartService.createCart();
      res.status(201).json({ status: "OK", cart: newCart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
  };

  deleteOne = async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cartService.deleteOne(cid);
      if (!cart)
        return res.status(404).json({ status: "Error", msg: "Cart not found" });

      res.status(200).json({ status: "OK", msg: "Cart deleted", cart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
  };

  addProductToCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const cart = await cartService.addProductToCart(cid, pid);
      res
        .status(201)
        .json({ status: "OK", msg: "Product added to cart", cart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
  };

  deleteProductFromCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const cart = await cartService.deleteProductFromCart(cid, pid);
      res.status(200).json({ status: "OK", cart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
  };

  updateQuantity = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;

      if (!quantity) {
        return res
          .status(400)
          .json({ status: "Error", msg: "Quantity is required" });
      }

      const cart = await cartService.updateQuantity(cid, pid, Number(quantity));

      res
        .status(200)
        .json({ status: "Updated", msg: "Product updated from cart", cart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
  };

  deleteAllProductsFromCart = async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cartService.deleteAllProductsFromCart(cid);
      res.status(200).json({ status: "OK", cart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
  };
}

export default CartController;
