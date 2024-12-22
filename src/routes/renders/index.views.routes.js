import { Router } from "express";
import viewSessionRouter from "./viewSession.router.js";
import viewProductRouter from "./viewProducts.router.js";
import viewCartRouter from "./viewCart.router.js";
import viewRealTimeProductsRouter from "./viewRealTimeProducts.router.js";
import { checkAuthorized } from "../../middlewares/checkAuthorized.js";
import { passportCallView } from "../../middlewares/passportCall.js";

const router = Router();

router.use("/", viewProductRouter);
router.use("/sessions", viewSessionRouter);
router.use("/products", viewProductRouter);
router.use("/realtimeproducts", passportCallView('current'),checkAuthorized, viewRealTimeProductsRouter);
router.use("/cart", viewCartRouter);


export default router;