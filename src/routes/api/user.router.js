import UserController from "../../controllers/user.controller.js";
import { Router } from "express";

const router = Router();

const { getAllUsers, getUserById, createUser, updateUser, deleteUser } =
  new UserController();

router.get("/", getAllUsers);

router.post("/", createUser);

router.get("/:uid", getUserById);

router.put("/:uid", updateUser);

router.delete("/:uid", deleteUser);

export default router;
