debugger;
var chai = require('chai');
var expect = chai.expect;

var validator = require('../../../src/lib/lib-validator');

describe('UNIT:validator.js -- Test validator', () => {


  it('Test simple object and one field value is empty', () => {

    var testObj = {
      aaa: 'aaa',
			bbb: ' '
    };

		validator.config = {
			"aaa" : "isNonEmpty",
			"bbb" :"isNonEmpty"
		}

		var result = validator.validate(testObj);
    //每個string是2,共有6個所以為12bytes
    expect(result).to.equal(false);
  });

  it('Test string varible and is empty', () => {

		var test = ' '; 

		validator.config = ['isNonEmpty']

		var result = validator.validate(test);
    //每個string是2,共有6個所以為12bytes
    expect(result).to.equal(false);
  });
});
