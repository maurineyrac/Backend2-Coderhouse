import { Router } from "express";
import ViewController from "../../controllers/view.controller.js";
import { passportCallView } from "../../middlewares/passportCall.js";

const router = Router();

const { renderCart } = new ViewController();

router.get("/", passportCallView("current"),renderCart);

export default router;