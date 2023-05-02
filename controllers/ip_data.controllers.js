let { redis } = require("../controllers/user.controllers");
let axios = require("axios");
require("dotenv").config();
let API_KEY = process.env.API;

let gitycityName = async (req, res) => {
  try {
    let id_add = req.params.id_app;

    let iscitynameincache = await redis.get(id_add);
    if (iscitynameincache) return res.send({ data: iscitynameincache });

    let response = await axios.get(
      `https://ipgeolocation.abstractapi.com/v1/?api_key=${API_KEY}&ip_address=${id_add}`
    );

    let cityname = response.data;
    redis.set(id_add, JSON.stringify(cityname), { EX: 60 * 60 * 6 });
    return res.send({ data: cityname });
  } catch (error) {
    res.send({ msg: error.message });
  }
};

module.exports = {
  gitycityName,
};
