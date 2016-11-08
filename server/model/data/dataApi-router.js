const controller = require('./dataApi-controller');
const Router = require('express').Router;
const router = new Router();

router.route('/:author/:datasKey')
  .get((...args) => controller.apiGetData(...args));
  //.post((...args) => controller.create(...args));

module.exports = router;
