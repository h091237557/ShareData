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
export function test (){console.log('hello')} 
