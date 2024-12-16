class TicketController {

  ticketPost = async (req, res) => {
    const { cid } = req.params;
    const cart = await cartService.getCart(cid);

    if (!cart) {
      return res.status(401).json({
        status: 'error',
        message: 'Cart not found'
      });
    }

    const productsNotPurchased = [];

    for (const item of cart.products) {
      const product = item.product;
      const quantity = item.quantity;
      const stock = await productService.getProductStock(product._id);

      if (quantity > stock) {

        productsNotPurchased.push(product._id);
      } else {

        await productService.updateProductStock(product._id, stock - quantity);
      }
    }

    const ticket = await ticketService.createTicket({
      user: req.user,
      products: cart.products,
      totalPrice: cart.totalPrice
    });


    if (productsNotPurchased.length > 0) {
      await cartService.updateCartProducts(cid, cart.products.filter(item => productsNotPurchased.includes(item.product._id)));
    } else {
      await cartService.emptyCart(cid);
    }

    res.status(200).json({
      status: 'success',
      message: 'Purchase completed successfully',
      productsNotPurchased,
      ticket
    });
  }
}

export default new TicketController()