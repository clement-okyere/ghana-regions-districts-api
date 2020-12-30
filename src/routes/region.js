const mongoose = require('mongoose');
const express = require('express');
const { Region } = require('../models/region');

const router = express.Router();

router.get('/', async (req, res) => {
  const regions = await Region.find();
  res.send(regions);
});

// endpoint accepts an array of regions
router.post('/', async (req, res) => {
  try {
    const regionsArray = [];
    for (let i = 0; i < req.body.length; i++) {
      const region = new Region({
        name: req.body[i].name,
        capital: req.body[i].capital,
      });
      regionsArray.push(region);
    }

    Region.insertMany(regionsArray)
      .then((resp) => res.status(200).send('region(s) inserted successfully'))
      .catch((err) => res.status(500).send('An error occurred'));
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
