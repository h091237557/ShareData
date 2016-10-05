'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.test = test;

var _dataSchema = require('./data-schema');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataModel = function () {
	function DataModel(Schema) {
		_classCallCheck(this, DataModel);

		this.Schema = Schema;
	}

	_createClass(DataModel, [{
		key: 'create',
		value: function create(input) {
			var schema = new this.Schema(input);
			return schema.save();
		}
	}]);

	return DataModel;
}();

function test() {
	console.log('hello');
}