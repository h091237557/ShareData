var validator = require('./lib-validator');

describe('Unit : Validator ', () => {
  it('should work', () => {
		let data = {
			"name" : "mark",
			"age" : " "
		}

		let validConfig = {
			"name" : "isNonEmpty",
			"age" : "isNonEmpty"
		}	

		validator.config = validConfig;
		
		var result = validator.validate(data);
    expect(result).toBe(false, 'should has one error');
  });

  it('should work', () => {
		let data = " ";

		let validConfig = ['isNonEmpty']
		validator.config = validConfig;

		var result = validator.validate(data);
    expect(result).toBe(false, 'should has one error');
  });
});
