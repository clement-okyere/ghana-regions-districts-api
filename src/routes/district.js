const { District } = require("../models/district");
const { Region } = require("../models/region");
var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {
  const districts = await District.find()
    .populate("region", "name -_id")
    .select("name capital region");
  res.status(200).send(districts);
});

//endpoint accepts an array of regions
router.post("/", async (req, res) => {
  try {
    if (!req.body.length)
      return res.send(400).send("districts cannot be empty");

    console.log("posted districts", req.body);
    let districtsArray = [];
    for (i = 0; i < req.body.length; i++) {
      let region = await Region.find({ name: req.body[i].region }).limit(1);
      console.log("matched region", region);

      let district = new District({
        name: req.body[i].name,
        capital: req.body[i].capital,
        region: region[0]._id,
      });
      districtsArray.push(district);
    }
    const result = District.insertMany(districtsArray)
      .then((resp) => {
        console.log("response", resp);
        return res.status(200).send("districts inserted successfully");
      })
      .catch((err) => {
        console.log("error", err);
        res.status(500).send("Ann error occurred");
      });
    console.log("result", result);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
