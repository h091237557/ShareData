debugger;
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

var DataFacade = require('../../../model/data/data-facade');
var Schema = require('../../../model/data/data-schema');
var Facade = new DataFacade(Schema);
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
  beforeEach(() => {});

  before(() => {
    sinon.stub(Schema.prototype, 'save');
  });

  afterEach(() => {
    Schema.prototype.save.reset();
  });

  after(() => {
    Schema.prototype.save.restore();
  });

  it('should save success', (done) => {
    let obj = JSON.stringify(mockDatas);
    let datas = {
      "id": "1",
      "data": obj,
      "describe": "test",
      "author": "Mark"
    }
    Schema.prototype.save.yields(null, {
      "status": "success"
    });
    let result = Facade.create(mockDatas);
    result.then((msg) => {
      expect(msg).to.exist;
      expect(Schema.prototype.save.callCount).to.equal(1);
      done();
    }).catch((err) => {
      done();
    });
  });

  it('should save error due to vaild error', (done) => {
    Schema.prototype.save.yields({
      "status": "faild"
    }, null);
    let result = Facade.create(mockDatas);
    result.then((msg) => {}).catch((err) => {
      expect(err).to.exist;
      done();
    });
  });

});

describe('UNIT:data-facade.js -- Delete data', function() {
  beforeEach(() => {

  });

  afterEach(() => {

  });

  before(() => {
    sinon.stub(Schema, 'findByIdAndRemove');
  });

  after(() => {

  });
  it('should delete success', (done) => {
    var expectedResult = {
      status: true
    };
    Schema.findByIdAndRemove.yields(null, expectedResult);
    var result = Facade.remove("1");
    result.then((msg) => {
      expect(msg).to.exist;
      done();
    }).catch((err) => {
      console.log(err);
      done();
    });
  });

  it('should delete fail due to no find id', (done) => {
    var expectedResult = {
      status: false
    };
    Schema.findByIdAndRemove.yields(expectedResult, null);
    var result = Facade.remove('1');
    result.then((msg) => {

    }).catch((err) => {
      expect(err).to.exist;
      done();
    });

  });

});
