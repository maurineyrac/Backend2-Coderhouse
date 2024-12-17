import { Router } from "express";
import viewSessionRouter from "./renders/viewSession.router.js";
import viewProductRouter from "./renders/viewProducts.router.js";

const router = Router();

router.use("/sessions", viewSessionRouter);
router.use("/products", viewProductRouter);

export default router;