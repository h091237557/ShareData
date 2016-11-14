import { Validator } from './validator';

var validator = new Validator();
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
		validator.validate(data);

		var actual = validator.hasErrors();
    expect(true).toBe(actual, 'should has one error');
  });
});
