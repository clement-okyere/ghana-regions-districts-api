// Require Mongoose
const mongoose = require('mongoose');

const Region = mongoose.model(
  'Region',
  new mongoose.Schema({
    name: { type: String, minlength: 2, unique: true },
    capital: { type: String, minlength: 2 },
    created_at: { type: Date, default: Date.now },
  }),
);

exports.Region = Region;
