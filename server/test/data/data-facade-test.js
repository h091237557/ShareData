debugger;
var chai = require('chai');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

var dataFacade = require('../../model/data/data-facade');
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
    Schema.find.yields(null, expectResult);
    var result = dataFacade.find(query);
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
		let schema = new Schema(mockDatas);
		save = sinon.stub(schema,'save')
	});

	afterEach(() => {
		save.restore();
	});

	it('should save error due to vaild error',(done) => {
		save.yields({"status":"success"},null);	
		var result = dataFacade.create(mockDatas);
		result.then((err) => {
			var aa = err;
		}).catch((err) => {
			expect(err).to.exist;
			done();
		});
	});

});
