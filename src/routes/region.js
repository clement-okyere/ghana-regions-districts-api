var express = require("express");
var router = express.Router();

router.use(
  (timeLog = (req, res, next) => {
    console.log("Time: ", Date.now());
    next();
  })
);

router.get("/", (req, res) => {
  res.send("All regions here");
});

module.exports = router;
