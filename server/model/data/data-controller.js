import { dataModel } from './data-facade';

class DataController {
	constructor(model){
		this.model = model;
	}

	find(req,res,next){
	}

	create(req,res,next){


	}
}

module.exports = new DataController(dataModel);
