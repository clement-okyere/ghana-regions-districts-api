const app = require("./src/loaders/server");
bodyParser = require("body-parser");
var regions = require("./src/routes/region");

const port = 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/regions", regions);

app.get("/", (req, res) => {
  res.send("regions and districts!");
});

var server = app.listen(port, () => {
  console.log(
    `application listening on port ${port} at http://localhost:${port}`
  );
});

module.exports = server;
