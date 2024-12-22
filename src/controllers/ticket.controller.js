import cartService from "../services/cart.services.js";
import ticketService from "../services/ticket.services.js";
import productService from "../services/product.services.js";

class TicketController {
  createTicket = async (req, res) => {
    try {
      const { cid } = req.params;
      const user = req.user;
      const productsNotPurchased = [];
      const productsDetails = await cartService.purchaseCart(cid);
      let amount = 0;
      for (const item of productsDetails) {
        const {productID, quantity, stock, price} = item;
        if (quantity > stock) {
          productsNotPurchased.push(productID);
        } else {
          await productService.updateProduct(productID, {
            stock: stock - quantity,
          });
          amount += price * quantity;
        }
      }
      const ticket = await ticketService.createTicket({
        purchaser: user.email,
        amount: amount,
        code: Math.random().toString(36).substring(7).toUpperCase(),
      });

      if (productsNotPurchased.length > 0) {
        await cartService.updateProductInCart(cid, productsNotPurchased);
      } else {
        await cartService.deleteAllProductsFromCart(cid);
      }

      res.status(200).json({
        status: "success",
        message: "Purchase completed successfully",
        productsNotPurchased,
        ticket,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  };
}

export default  TicketController;
