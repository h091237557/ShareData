debugger;
var chai = require('chai');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

var DataFacade = require('../../model/data/data-facade');
var Schema = require('../../model/data/data-schema');
var mockDatas = require('./mock-datas');

describe('Get All Data', function() {
  var find;
  beforeEach(() => {
    find = sinon.stub(Schema, 'find');
  });

  afterEach(() => {
    Schema.find.restore();
  });

  it('should return all datas', function(done) {
    var expectResult = {
      "test": "mark"
    };
    var query = "";
		var Facade = new DataFacade(Schema);
    Schema.find.yields(null, expectResult);
    var result = Facade.find(query);
    result.then((datas) => {
      sinon.assert.calledOnce(find);
      expect(datas).to.equal(expectResult);
      done();
    });
  });
});

describe('Save Data', () => {
	var save;
	beforeEach(() => {
		//let schema = new Schema(mockDatas);
		//save = sinon.stub(schema,'save')
	});

	afterEach(() => {
		save.restore();
	});

	it('should save success',(done) => {
		let obj = JSON.stringify(mockDatas);
		let datas = {
			"id" : "1",
			"data" : obj,
			"describe" : "test",
			"author" : "Mark"
		}
		let MockSchema = sinon.mock(Schema);
		MockSchema.expects('save').yields(null,{"status":"success"});
		let mock = MockSchema.object;
		let Facade = new DataFacade(mock);
		let result = Facade.create(datas);
		result.then((err) => {
			let etest = 0;
			done();
		}).catch((err) => {
			let aa = 0;
			done();
		});
	});

	it('should save error due to vaild error',(done) => {
		var result = dataFacade.create(mockDatas);
		result.then((err) => {
			var aa = err;
		}).catch((err) => {
			expect(err).to.exist;
			done();
		});
	});

});
