import Router from "express";
import CartController from "../../controllers/cart.controller.js";
import ticketController from "../../controllers/ticket.controller.js";
import { checkIDs } from "../../middlewares/checkMongoID.midware.js";
import { checkProductInCart } from "../../middlewares/checkProductInCart.midware.js";
import { passportCallView } from "../../middlewares/passportCall.js";


const {
  createCart,
  getAllCarts,
  getCart,
  addProductToCart,
  updateQuantity,
  deleteOne,
  deleteProductFromCart,
  deleteAllProductsFromCart,
} = new CartController();

const router = Router();


router.get("/", getAllCarts);
router.get("/:cid", checkIDs, getCart);
router.post("/", createCart);
router.post("/:cid/products/:pid", checkIDs, addProductToCart);
router.put("/:cid/products/:pid", checkIDs, checkProductInCart, updateQuantity);
router.delete("/:cid/deleteCart", checkIDs, deleteOne);
router.delete("/:cid/products/:pid", checkIDs, checkProductInCart, deleteProductFromCart);
router.delete("/:cid", checkIDs, deleteAllProductsFromCart);
router.post("/:cid/purchase", passportCallView('current') ,checkIDs, ticketController.purchaseCart);


export default router;
