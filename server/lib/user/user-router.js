'use strict';

var controller = require('./user-controller');
var Router = require('express').Router;
var router = new Router();

router.route('/').get(function () {
  return controller.find.apply(controller, arguments);
}).post(function () {
  return controller.create.apply(controller, arguments);
});

router.route('/:id').put(function () {
  return controller.update.apply(controller, arguments);
}).get(function () {
  return controller.findById.apply(controller, arguments);
}).delete(function () {
  return controller.remove.apply(controller, arguments);
});

module.exports = router;