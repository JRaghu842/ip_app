let express = require("express");
const { register, login, logout } = require("../controllers/user.controllers");
const { auth } = require("../middlewares/auth");
let UserRouter = express.Router();

UserRouter.post("/register", register);
UserRouter.post("/login", login);
UserRouter.get("/logout", auth, logout);

module.exports = {
  UserRouter,
};
