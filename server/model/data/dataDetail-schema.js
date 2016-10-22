const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataDetailSchema = new Schema({
	dataId:{
		type:String,
		index:true
	},
	data:{
		type:[]
	},
	isFinal :{
		type:Boolean
	}
})

module.exports = mongoose.model('DataDetail',dataDetailSchema);


