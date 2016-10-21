debugger;
var mongoose = require('mongoose');
var config = require('../test-config');
var chai = require('chai');
var expect = chai.expect;

var DataService = require('../../../model/data/data-service');
var Schema = require('../../../model/data/data-schema');
var Service = new DataService(Schema);

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
		let obj = [{"id":"1"},{"id":"2"},{"id":"3"}];
    let datas = {
      "data": obj,
      "describe": "test",
      "author": "Mark"
    }
    let createResult = Service.create(datas);
    createResult.then((data) => {
      return Service.find({
        "_id": data._id.toString() 
      });
    }).then((data) => {
      expect(data.length).to.equal(1);
      var removeId = data[0]._id.toString();
      return Service.remove(removeId);
    }).then((msg) => {
      done();
    }).catch((err) => {
      console.log(err);
    });

  });

});
