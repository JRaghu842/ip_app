let { redis } = require("../controllers/user.controllers");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
require("dotenv").config();

let auth = async (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    if (!token) return res.status(400).send({ msg: "Please login first" });

    let istokenvalid = await jwt.verify(token, process.env.SECRETE);
    if (!istokenvalid)
      return res.status(400).send({ msg: "verification failed, login agian" });

    let istokenBlacklisted = await redis.get(token);
    if (istokenBlacklisted) return res.send({ msg: "please login again" });

    req.body.userId = istokenvalid.userId;
    req.body.ip_address = istokenvalid.ip_address;

    next();
  } catch (error) {
    res.send({ msg: error.message });
  }
};

module.exports = {
  auth,
};
