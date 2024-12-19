import { Router } from "express";
import ViewController from "../../controllers/view.controller.js";


const router = Router();

const { renderProducts } = new ViewController();


router.get("/", renderProducts);

export default router;
