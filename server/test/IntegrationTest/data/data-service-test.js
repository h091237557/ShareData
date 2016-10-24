debugger;
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
var config = require('../test-config');
var chai = require('chai');
var expect = chai.expect;

var DataService = require('../../../model/data/data-service');
var Schema = require('../../../model/data/data-schema');
var DataDetailSchema = require('../../../model/data/dataDetail-schema');
var Service = new DataService(Schema, DataDetailSchema);

describe('Integration: data-service.js -- Get Data', () => {
  before(() => {
    config.connect((err) => {
      if (err) {
        console.log(err.message);
      }
    });
  });

  after(() => {
		config.close((msg) => {
		console.log(msg);
		});
  });


  it('should return datas and clear datas', (done) => {
    let obj = [{
      "id": "1"
    }, {
      "id": "2"
    }, {
      "id": "3"
    }];
    let datas = {
      "data": obj,
      "describe": "test",
      "author": "Mark"
    }
    let createResult = Service.create(datas);
		
		createResult.then((data) => {
			return Service.find({
				_id: data._id.toString()
			});
		}).then((datas) => {
			console.log(datas);
			expect(datas.length).to.equal(1);
			var removeId = datas[0]._id.toString();
			return Service.remove(removeId);
		}).then((msg) => {
			done();
		}).catch((err) => {
			console.log(err);
		});
  });
});

describe('Integration: data-service.js -- Get Data (1 million test)', () => {
  before(() => {
    config.connect((err) => {
      if (err) {
        console.log(err.message);
      }
    });
  });

  after(() => {
		config.close((msg) => {
		console.log(msg);
		});
  });
	it('should return datas and clear datas',(done) => {
		let size = 1000,
			datas = [];
		
		for (var i=0;i<size;i++){
			datas.push({
				"id" :  i,
				"aruthor" : "Mark"
			})
		};

		let input = {
			"data" : datas,
			"describe" : "million test",
			"author" : "Mark Big"
		}

		let createResult = Service.create(input);
		
		createResult.then((data) => {
			return Service.find({
				_id: data._id.toString()
			});
		}).then((datas) => {
			expect(datas.length).to.equal(1);
			var removeId = datas[0]._id.toString();
			return Service.remove(removeId);
		}).then((msg) => {
			done();
		}).catch((err) => {
			console.log(err);
		});
	
	}).timeout(10000);
});
