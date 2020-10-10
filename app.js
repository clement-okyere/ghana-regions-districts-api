var mongoose = require("mongoose");
const app = require("./src/loaders/server");
bodyParser = require("body-parser");
const regions = require("./src/routes/region");
const districts = require("./src/routes/district");

const port = 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//Set up default mongoose connection
var mongoDB = "mongodb://127.0.0.1/region_api";

mongoose
  .connect(mongoDB, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDb"))
  .catch((err) => console.error("Could not connect to mongodb", err));

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/regions", regions);
app.use("/districts", districts);

app.get("/", (req, res) => {
  res.send("regions and districts!");
});

var server = app.listen(port, () => {
  console.log(
    `application listening on port ${port} at http://localhost:${port}`
  );
});

module.exports = server;
