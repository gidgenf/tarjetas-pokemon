const express = require("express");
const usersRouter = express.Router();
// Importamos los controllers necesarios
const usersController = require("../controllers/usersController");

usersRouter.get("/", usersController.getUsers);

usersRouter.get("/:id", usersController.getUserById);

usersRouter.post("/", usersController.createUser);

usersRouter.put("/:id", usersController.updateUser);

usersRouter.delete("/:id", usersController.deleteUser);

module.exports = usersRouter;
