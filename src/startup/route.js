const regions = require("../routes/region");
const districts = require("../routes/district");
const error = require("../middleware/error");
bodyParser = require("body-parser");

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/regions", regions);
  app.use("/districts", districts);
  app.use(error);
};
