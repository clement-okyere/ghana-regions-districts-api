const { District } = require("../models/district");
const { Region } = require("../models/region");
var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();

//get all regions
router.get("/", async (req, res) => {
  const districts = await District.find()
    .populate("region", "name -_id")
    .select("name capital region");
  res.status(200).send(districts);
});

//get district by region
router.get("/:region/region", async (req, res) => {
  var regex = new RegExp(["^", req.params.region, "$"].join(""), "i");
  let region = await Region.find({ name: regex }).limit(1);

  if (!region.length) return res.send(400).send("region not found");

  const districts = await District.find({ region: { $eq: region[0]._id } })
    //.populate("region", "name -_id")
    .populate({
      path: "region",
      match: { _id: { $eq: region[0]._id } },
      select: "name -_id",
    })
    .select("name capital region");
  res.status(200).send(districts);
});

//endpoint accepts an array of districts
router.post("/", async (req, res) => {
  try {
    if (!req.body.length)
      return res.send(400).send("districts cannot be empty");

    let districtsArray = [];
    for (i = 0; i < req.body.length; i++) {
      let region = await Region.find({ name: req.body[i].region }).limit(1);

      let district = new District({
        name: req.body[i].name,
        capital: req.body[i].capital,
        region: region[0]._id,
      });
      districtsArray.push(district);
    }
    const result = District.insertMany(districtsArray)
      .then((resp) => {
        return res.status(200).send("district(s) inserted successfully");
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
