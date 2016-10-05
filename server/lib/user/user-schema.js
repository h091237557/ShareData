'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String }
});

module.exports = mongoose.model('User', userSchema);