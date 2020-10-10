//Require Mongoose
const mongoose = require("mongoose");

const District = mongoose.model(
  "District",
  new mongoose.Schema({
    name: { type: String, minlength: 2, unique: true },
    capital: { type: String, minlength: 2 },
    created_at: { type: Date, default: Date.now },
    region: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Region",
    },
  })
);

exports.District = District;
