var express = require('express');
var router = express.Router();
var models = require('../models/auth');
var handleresult = require('../configs/handleResult');
var { Rules, validate } = require('../validator/auth');


/* GET users listing. */
router.post('/register', Rules(), validate,
  async function (req, res, next) {
    try {
      var token = await models.Register(req.body);
      handleresult.showResult(res, 200, true, token);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  });
router.post('/login',
  async function (req, res, next) {
    try {
      var item = await models.Login(req.body);
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  });

module.exports = router;
