import { Router } from "express";
import { userModel } from "../../dao/mongoDB/models/users.models.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.send({ status: "success", data: users });
  } catch (error) {
    console.log(error);
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const { first_name, last_name, email } = req.body;
//     if (!email) {
//       res.status(400).send({ status: "failed", message: "Email is required" });
//       return;
//     }
//     const result = await userModel.create({ first_name, last_name, email });
//     res.status(201).send({ status: "success", data: result });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ status: "failed", message: "Internal server error" });
//   }
// });

router.get("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await userModel.findOne({ _id: uid });
    res.status(200).send({ status: "success", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "failed", message: "Internal server error" });
  }
});

router.put("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const { first_name, last_name, email } = req.body;
    if (!email) {
      res.status(400).send({ status: "failed", message: "Email is required" });
      return;
    }
    const userToUpdate = { first_name, last_name, email };
    const result = await userModel.findByIdAndUpdate(uid, userToUpdate, {
      new: true,
    });
    res.status(200).send({ status: "success", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "failed", message: "Internal server error" });
  }
});

router.delete("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const result = await userModel.findByIdAndDelete({ _id: uid });
    res.status(204).send({ status: "success", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "failed", message: "Internal server error" });
  }
});

export default router;
