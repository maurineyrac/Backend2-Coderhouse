import { Router } from "express";
import ViewController from "../../controllers/view.controller.js";
import { passportPublicView } from "../../middlewares/passportCall.js";


const router = Router();

const { renderProducts } = new ViewController();


router.get("/", passportPublicView('current'),renderProducts);

export default router;
