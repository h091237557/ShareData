import { dataSchema } from './data-schema';

class DataModel {
	constructor(Schema){
		this.Schema = Schema;
	}

	create(input) {
		const schema = new this.Schema(input);
		return schema.save();
	}

}

module.exports = new DataModel(dataSchema);
