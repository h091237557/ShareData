debugger;
var chai = require('chai');
var expect = chai.expect;

var jsonParser = require('../../../src/parser/jsonParser');

describe('UNIT:.jsonParserjs -- Test jsonParser', () => {


  it('Test input numer and should return status false', () => {

    var result = jsonParser(1);
    expect(result.status).to.equal(false);
  });

  it('Test obj and should return status true , and result should array ob', () => {
    var result = jsonParser({
      "a": 1
    });
    expect(result.status).to.equal(true);
		expect(result.datas.hasOwnProperty("length")).to.equal(true)
  });

  it('Test array and should returns status true , and result should array', () => {
    var result = jsonParser([{"a":1}]);
    expect(result.status).to.equal(true);
		expect(result.datas.hasOwnProperty("length")).to.equal(true)
  });

});
