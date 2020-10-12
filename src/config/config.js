var convict = require("convict");
const fs = require("fs");

//convict.addFormat(require("convict-format-with-validator").ipaddress);

// Define a schema
var config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  //   ip: {
  //     doc: "The IP address to bind.",
  //     format: "ipaddress",
  //     default: "127.0.0.1",
  //     env: "IP_ADDRESS",
  //   },
  //   port: {
  //     doc: "The port to bind.",
  //     format: "port",
  //     default: 8080,
  //     env: "PORT",
  //     arg: "port",
  //   },
  db: {
    host: {
      doc: "Database host name/IP",
      format: String,
      default: "",
      env: "MONGODB_HOST",
    },
    database: {
      doc: "Database name",
      format: String,
      default: "",
      env: "MONGODB_DATABASE",
    },
  },
});

const env = config.get("env");
const configPath = `./config/${env}.json`;

if (fs.existsSync(configPath)) {
  config.loadFile(configPath);
}

module.exports = config;
