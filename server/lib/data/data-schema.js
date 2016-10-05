'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  data: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('Data', dataSchema);