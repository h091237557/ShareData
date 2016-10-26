debugger;
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var DataService = require('../../../model/data/data-service');
var Schema = require('../../../model/data/data-schema');
var DataDetailSchema = require('../../../model/data/dataDetail-schema');
var Service = new DataService(Schema, DataDetailSchema);

describe('UNIT:data-service.js -- Get All Data', function() {
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
    var result = Service.find(query);
    result.then((datas) => {
      sinon.assert.calledOnce(find);
      expect(datas).to.equal(expectResult);
      done();
    });
  });
});

describe('UNIT:data-service.js -- Save Data', () => {

  var testDatas = {
    "describe": "test",
    "author": "Mark"
  }

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

    Schema.prototype.save.yields(null, {
      "status": "success"
    });
    let result = Service.saveData(testDatas, () => {
      console.log('Save Data Success')
    });

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
    let result = Service.saveData(testDatas, (msg) => {
      console.log(msg);
    });
    result.then((msg) => {}).catch((err) => {
      expect(err).to.exist;
      done();
    });
  });

});

describe('UNIT:data-service.js -- test deletedata by Id', function() {

  var sinonObj;
  before(() => {
    sinonObj = sinon.stub(Schema, 'findByIdAndRemove');
  });

  after(() => {
    sinonObj.restore();
  });

  it('should delete success', (done) => {
    var expectedResult = {
      status: true
    };
    Schema.findByIdAndRemove.yields(null, expectedResult);
    var result = Service.removeDataByDataId("1");
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
    var result = Service.removeDataByDataId('1');
    result.then((msg) => {

    }).catch((err) => {
      expect(err).to.exist;
      done();
    });

  });
});

describe('UNIT : data-service.js -- test splitData ', () => {
  it('should split 10 element in array', () => {
    let dataId = "1";
    let size = 10000,
      dataArr = [],
      testObj = {
        "id": "1",
        "price": "1000"
      };
    for (var i = 0; i < size; i++) {
      dataArr.push(testObj);
    }

    var input = {
      data: dataArr,
    }

    var result = Service.splitData(dataId, input);
    expect(result.length).to.equal(10000);
  });
});

describe('UNIT : data-service.js -- test bulk data to DataDetal', () => {
  var bulksinon;
  before(() => {
    bulksinon = sinon.stub(DataDetailSchema.collection, 'insert');
  });

  it('should bulk save success', (done) => {
    datas = [{
      "dataId": "1",
      "data": [1, 2, 3],
      "isFinal": false
    }, {
      "dataId": "2",
      "data": [1, 2, 3],
      "isFinal": true
    }];

    DataDetailSchema.collection.insert.yields(null, datas);
    var result = Service.bulkSaveDataDetail(datas, (msg) => {
      console.log(msg)
    });

    result.then((datas) => {
      expect(datas).to.exist;
      done();
    }).catch((err) => {
      console.log(err);
      done();
    });
  });
});

describe('UNIT : data-service.js -- test create ', () => {

  it('should create success', (done) => {
    let size = 10000,
      data = {},
      dataArr = [],
      testObj = {
        "id": "1",
        "price": "1000"
      };
    for (var i = 0; i < size; i++) {
      dataArr.push(testObj);
    }

    data = {
      author: "mark",
      data: dataArr,
      descript: "test"
    }

    var stubSaveData = sinon.stub(Service, "saveData");
    stubSaveData.returns(Promise.resolve({
      _id: "1001"
    }));

    var stubBulkSaveDetail = sinon.stub(Service, "bulkSaveDataDetail");
    stubBulkSaveDetail.returns(Promise.resolve({
      status: "success"
    }));

    var result = Service.create(data);
    result.then((datas) => {
      expect(datas.length).to.equal(10000);
      done();
    }).catch((err) => {
      done();
    });
  });

});
describe('UNIT : data-service.js -- test delete datadetail ', () => {
  var sinonObj;
  before(() => {
    sinonObj = sinon.stub(DataDetailSchema.collection, 'remove');
  });

  after(() => {
    sinonObj.restore();
  });

  it('should delete success', (done) => {
    var expectedResult = {
      status: true
    };
    DataDetailSchema.collection.remove.yields(null, expectedResult);
    var result = Service.removeDataDetailsByDataId("1");
    result.then((msg) => {
      expect(msg).to.exist;
      done();
    }).catch((err) => {
      console.log(err);
      done();
    });
  });
});

describe('UNIT : data-service.js -- test remove data method  ', () => {
  var sinonRemoveData,
    sinonRemoveDataDetails;
  before(() => {});

  after(() => {
    sinonRemoveData.restore();
    sinonRemoveDetails.restore();
  });

  it('should delete success', (done) => {
    var expectedResult = {
      status: true
    };

    sinonRemoveData = sinon.stub(Service, "removeDataByDataId");
    sinonRemoveDetails = sinon.stub(Service, "removeDataDetailsByDataId");

    sinonRemoveData.returns(Promise.resolve(expectedResult));
    sinonRemoveDetails.returns(Promise.resolve(expectedResult));
    var result = Service.remove("1");
    result.then((msg) => {
      expect(msg).to.exist;
      done();
    }).catch((err) => {
      console.log(err);
      done();
    });
  });
});

describe('UNIT : data-service.js -- test update datadetail method  ', () => {
  var sinonUpdateDataDetail;
  before(() => {
    sinonUpdateDataDetail = sinon.stub(DataDetailSchema, "findOneAndUpdate");
  });

  after(() => {
    sinonUpdateDataDetail.restore();
  });

  it('should update success', (done) => {
    var expectedResult = {
      status: true
    };

    DataDetailSchema.findOneAndUpdate.yields(null, expectedResult);

    var result = Service.updateDataDetail({
      "data.id": 1
    }, {
      "id": 1,
      "author": "Lin"
    });
    result.then((msg) => {
      expect(msg).to.exist;
      done();
    }).catch((err) => {
      console.log(err);
      done();
    });
  });
  it('should update fail', (done) => {
    var expectedResult = {
      status: false 
    };

    DataDetailSchema.findOneAndUpdate.yields(expectedResult, null);

    var result = Service.updateDataDetail({
      "data.id": 1
    }, {
      "id": 1,
      "author": "Lin"
    });
    result.then((msg) => {
      expect(msg).to.exist;
      done();
    }).catch((err) => {
      console.log(err);
      done();
    });
  });
});
