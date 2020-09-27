const express = require("express");
var regions = require("./src/routes/region");
const app = express();

const port = 3000;

app.use("/regions", regions);

app.get("/", (req, res) => {
  res.send("regions and districts!");
});

app.listen(port, () => {
  console.log(
    `application listening on port ${port} at http://localhost:${port}`
  );
});
