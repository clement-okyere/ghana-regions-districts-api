const express = require('express');
const { District } = require('../models/district');
const { Region } = require('../models/region');

const router = express.Router();

// get all regions
router.get('/', async (req, res) => {
  const districts = await District.find()
    .populate('region', 'name -_id')
    .select('name capital region');
  res.status(200).send(districts);
});

// get district by region
router.get('/:region/region', async (req, res) => {
  const regex = new RegExp(['^', req.params.region, '$'].join(''), 'i');
  const region = await Region.find({ name: regex }).limit(1);

  if (!region.length) return res.send(400).send('region not found');

  const districts = await District.find({ region: { $eq: region[0]._id } })
    .populate({
      path: 'region',
      match: { _id: { $eq: region[0]._id } },
      select: 'name -_id',
    })
    .select('name capital region');
  res.status(200).send(districts);
});

// endpoint accepts an array of districts
router.post('/', async (req, res) => {
  try {
    if (!req.body.length) { return res.send(400).send('districts cannot be empty'); }

    const districtsArray = [];
    for (let i = 0; i < req.body.length; i++) {
      const region = await Region.find({ name: req.body[i].region }).limit(1);

      const district = new District({
        name: req.body[i].name,
        capital: req.body[i].capital,
        region: region[0]._id,
      });
      districtsArray.push(district);
    }
    District.insertMany(districtsArray)
      .then((resp) => res.status(200).send('district(s) inserted successfully'))
      .catch((err) => {
        res.status(500).send(err);
      });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
