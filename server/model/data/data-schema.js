const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const dataSchema = new Schema({
  describe: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
	author: {
		type: String,
		require:true
	}
});

module.exports = mongoose.model('Data', dataSchema);
