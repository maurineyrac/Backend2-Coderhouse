import Router  from "express";
import ProductController from "../../controllers/product.controller.js";
import { checkProductData } from "../../middlewares/checkProductData.midware.js";
import { checkIDs } from "../../middlewares/checkMongoID.midware.js";
import { checkProductKeys } from "../../middlewares/checkProductKeys.midware.js";

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = new ProductController();

const router = Router();

router.get("/", checkProductData, getAllProducts);
router.get("/:pid", checkIDs, getProductById);
router.post("/", checkProductData, createProduct);
router.put("/:pid", checkIDs, checkProductKeys, updateProduct);
router.delete("/:pid", checkIDs, deleteProduct);

export default router;