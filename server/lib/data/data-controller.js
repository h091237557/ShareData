'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dataFacade = require('./data-facade');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataController = function () {
	function DataController(model) {
		_classCallCheck(this, DataController);

		this.model = model;
	}

	_createClass(DataController, [{
		key: 'find',
		value: function find(req, res, next) {}
	}, {
		key: 'create',
		value: function create(req, res, next) {}
	}]);

	return DataController;
}();

module.exports = new DataController(_dataFacade.dataModel);