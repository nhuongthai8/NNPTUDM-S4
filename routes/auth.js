var express = require('express');
var router = express.Router();
var models = require('../models/auth');
var handleresult = require('../configs/handleResult');
var config = require('../configs/configs');
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
      var result = await models.Login(req.body);
      if(!result.error){
        saveCookieResponse(res,200,result);
      }else{
        handleresult.showResult(res, 200, true, result);
      }
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  });

module.exports = router;
function saveCookieResponse(res,StatusCode,token){
  const option = {
    expirers: new Date(Date.now()+config.COOKIE_EXPIRE*24*3600*1000),
    httpOnly:true
  }
  res.status(StatusCode).cookie('token',token,option).json({
    success:true,
    data:token
  })
}