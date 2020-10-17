require("dotenv").config();
const express = require("express");
const winston = require("winston");
const app = express();

const config = require("./src/config/config");
const port = config.get("port");

require("./src/startup/logging");
require("./src/startup/route")(app);
require("./src/startup/db")();

app.listen(port, () => {
  winston.info(
    `application listening on port ${port} at http://localhost:${port}`
  );
});
