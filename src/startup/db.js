const winston = require('winston');
const mongoose = require('mongoose');
const config = require('../config/config');

module.exports = function () {
  mongoose
    .connect(`mongodb://${config.get('db').host}:27017/${config.get('db').name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => winston.info('Connected to MongoDB...'))
    .catch((err) => console.log(err));
};
