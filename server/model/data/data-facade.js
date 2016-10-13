var dataSchema = require('./data-schema');

class DataModel {
	constructor(Schema){
		this.Schema = Schema;
	}

	create(input) {
		const schema = new this.Schema(input);
		return schema.save();
	}

	find(query) {
		var promise = new Promise((resolve,reject) => {
			this.Schema.find(query,(err,data) => {
				resolve(data);
			});
		})
		return promise;
	}
}

module.exports = new DataModel(dataSchema);
