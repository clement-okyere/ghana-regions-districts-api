const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
const config = require("../config/config");

module.exports = function () {
  winston.exceptions.handle(new winston.transports.Console({ level: "error" }));

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  
  winston.add(new winston.transports.Console(), { level: "info" });
  winston.add(
    new winston.transports.MongoDB({
      db: `mongodb://${config.get("db").host}:27017/${config.get("db").name}`,
      level: "info",
    })
  );
};
