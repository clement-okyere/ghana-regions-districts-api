const { Region } = require("../models/Regions");
var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {
  const regions = await region.find();
  res.send(regions);
});

//endpoint accepts an array of regions
router.post("/", async (req, res) => {
  try {
    console.log("posted regions", req.body);
    let regionsArray = [];
    for (i = 0; i < req.body.length; i++) {
      let region = new Region({
        name: req.body[i].name,
        capital: req.body[i].capital,
      });
      regionsArray.push(region);
    }
    const result = Region.insertMany(regionsArray);
    res.status(200).send("regions inserted successfully", result);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
