const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("regions and districts!");
});

app.listen(port, () => {
  console.log(
    `application listening on port ${port} at http://localhost:${port}`
  );
});
