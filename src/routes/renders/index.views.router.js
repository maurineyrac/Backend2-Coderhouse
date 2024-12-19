import { Router } from "express";
import viewSessionRouter from "./viewSession.router.js";
import viewProductRouter from "./viewProducts.router.js";

const router = Router();

router.use("/sessions", viewSessionRouter);
router.use("/products", viewProductRouter);

export default router;