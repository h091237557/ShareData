debugger;
var chai = require('chai');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

var dataFacade = require('../../model/data/data-facade');
var Schema = require('../../model/data/data-schema')
  //var mockData = require('./mock-data.js');
  //var mockDatas = require('./mock-datas.js');


describe('Get All Datas', function() {
	var find ;
  beforeEach(() => {
    find = sinon.stub(Schema, 'find');
  });

  afterEach(function() {
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
