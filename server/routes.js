const Router = require('express').Router;
const router = new Router();

const user  = require('./model/user/user-router');
const data = require('./model/data/data-router');


router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to server API!' });
});

router.use('/user', user);

router.use('/datas',data);

module.exports = router;
