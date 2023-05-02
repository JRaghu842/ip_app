let { UserModel } = require("../models/user.model");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let Redis = require("ioredis");
let redis = new Redis();
require("dotenv").config();

let register = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let isUserexists = await UserModel.findOne({ email });

    if (isUserexists)
      return res.send({ msg: "user already registered, just login" });

    let hash = await bcrypt.hash(password, 5);

    let user = new UserModel({ name, email, password: hash });
    await user.save();
    res.status(200).send({ msg: "Registration successful" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

let login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let isuserexist = await UserModel.findOne({ email });
    if (!isuserexist)
      return res.send({ msg: "User not found in DB, register first" });

    let isPasswordvalid = await bcrypt.compare(password, isuserexist.password);

    if (!isPasswordvalid) return res.send({ msg: "Wrong credentials" });

    let token = await jwt.sign(
      { userId: isuserexist._id, ip_address: isuserexist.ip_address },
      process.env.SECRETE,
      { expiresIn: "6hr" }
    );

    res.status(200).send({ msg: "Login successful", token });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

let logout = async (req, res) => {
  try {
    let token = req.headers?.authorization;

    if (!token) return res.send({ msg: "Please login first" });

    await redis.set(token, token);
    res.status(200).send({ msg: "logout successful" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  redis,
};
