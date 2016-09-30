const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const dataSchema = new Schema({
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
