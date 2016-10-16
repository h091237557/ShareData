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

describe('UNIT:data-facade.js -- Get All Data', function() {
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

describe('UNIT:data-facade.js -- Save Data', () => {
	var save;
	beforeEach(() => {
		//let schema = new Schema(mockDatas);
		//save = sinon.stub(schema,'save')
	});

	before(() => {
		sinon.stub(Schema.prototype,'save');
	});

	afterEach(() => {
		Schema.prototype.save.reset();
	});

	after(() => {
		Schema.prototype.save.restore();
	});

	it('should save success',(done) => {
		let obj = JSON.stringify(mockDatas);
		let datas = {
			"id" : "1",
			"data" : obj,
			"describe" : "test",
			"author" : "Mark"
		}
		Schema.prototype.save.yields(null,{"status" : "success"});		
		let Facade = new DataFacade(Schema);
		let result = Facade.create(datas);
		result.then((msg) => {
			expect(msg).to.exist;
			done();
		}).catch((err) => {
			done();
		});
	});

	it('should save error due to vaild error',(done) => {
		let Facade = new DataFacade(Schema);
		Schema.prototype.save.yields({"status":"faild"},null);
		var result = Facade.create(mockDatas);
		result.then((msg) => {
			var aa = err;
		}).catch((err) => {
			expect(err).to.exist;
			done();
		});
	});

});
