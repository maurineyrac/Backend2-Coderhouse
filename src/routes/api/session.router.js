import Router from "express";
import { passportCall } from "../../middlewares/passportCall.js";
import SessionController from "../../controllers/session.controller.js";

const router = Router();

const { register, login, logout, current } = new SessionController();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/current", passportCall("current"), current);

export default router;
