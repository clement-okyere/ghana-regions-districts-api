const { Region } = require("../models/region");
var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {
  const regions = await Region.find();
  res.send(regions);
});

//endpoint accepts an array of regions
router.post("/", async (req, res) => {
  try {
    let regionsArray = [];
    for (i = 0; i < req.body.length; i++) {
      let region = new Region({
        name: req.body[i].name,
        capital: req.body[i].capital,
      });
      regionsArray.push(region);
    }

    const result = Region.insertMany(regionsArray)
      .then((resp) => {
        return res.status(200).send("region(s) inserted successfully");
      })
      .catch((err) => {
        return res.status(500).send("An error occurred");
      });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
