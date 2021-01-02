require("dotenv").config();
const express = require("express");
const winston = require("winston");
const app = express();

const config = require("./src/config/config"); 
const port = config.get("port");
const swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('./swagger.json');

require("./src/startup/logging")();
require("./src/startup/route")(app);
require("./src/startup/db")();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = app.listen(port, () => {
  winston.info(
    `application listening on port ${port} at http://localhost:${port}`
  );
});
module.exports = server;