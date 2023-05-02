let winston = require("winston");
// let { mongoDB } = require("winston-mongodb");

let logger = winston.logger({
  transports: [
    new winston.transports.MongoDB({
      db: process.env.MongoURL,
      level: "error",
    }),
  ],
  format: winston.format.prettyPrint(),
});

module.exports = {
  logger,
};
