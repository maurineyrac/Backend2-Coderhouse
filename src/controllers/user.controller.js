import userService from "../services/user.services";

export default class UserController {
  getAllUsers = async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).send({ status: "success", data: users });
    } catch (error) {
      res
        .status(500)
        .send({ status: "failed", message: "Internal server error" });
    }
  };
  getUserById = async (req, res) => {
    try {
      const users = await userService.getUserById();
      res.status(200).send({ status: "success", data: users });
    } catch (error) {
      res
        .status(500)
        .send({ status: "failed", message: "Internal server error" });
    }
  };

  createUser = async (req, res) => {
    try {
      const { first_name, last_name, email } = req.body;
      if (!email) {
        res
          .status(400)
          .send({ status: "failed", message: "Email is required" });
        return;
      }
      const result = await userService.createUser({
        first_name,
        last_name,
        email,
      });
      res.status(201).send({ status: "success", data: result });
    } catch (error) {
      res
        .status(500)
        .send({ status: "failed", message: "Internal server error" });
    }
  };

  updateUser = async (req, res) => {
    try {
      const { uid } = req.params;
      const { first_name, last_name, email } = req.body;

      if (!email) {
        res
          .status(400)
          .send({ status: "failed", message: "Email is required" });
        return;
      }

      const userToUpdate = { first_name, last_name, email };
      const result = await userService.updateUser(uid, userToUpdate);
      res.status(200).send({ status: "success", data: result });
    } catch (error) {
      res
        .status(500)
        .send({ status: "failed", message: "Internal server error" });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { uid } = req.params;
      const result = await userService.deleteUser(uid);
      res.status(200).send({ status: "success", data: result });
    } catch (error) {
      res
        .status(500)
        .send({ status: "failed", message: "Internal server error" });
    }
  };
}
