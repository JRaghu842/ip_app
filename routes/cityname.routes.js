let express = require("express");
const { auth } = require("../middlewares/auth");
const { gitycityName } = require("../controllers/ip_data.controllers");

let cityRouter = express.Router();

cityRouter.get("/:id_add", auth, gitycityName);

module.exports = {
  cityRouter,
};
