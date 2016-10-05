'use strict';

var controller = require('./data-controller');
var Router = require('express').Router;
var router = new Router();

router.route('/').get(function () {
  return controller.find.apply(controller, arguments);
}).post(function () {
  return controller.create.apply(controller, arguments);
});

module.exports = router;