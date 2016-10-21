const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataDetailSchema = new Schema({
	dataid:{
		type:String,
		index:true
	},
	data:{
		type:[]
	},
	isfinal :{
		type:Boolean
	}
})

module.exports = mongoose.model('DataDetail',dataDetailSchema);


