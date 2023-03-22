var express = require('express');
var router = express.Router();
var models = require('../models/careers');
var handleresult = require('../configs/handleResult')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    var items = await models.getAllItem();
    handleresult.showResult(res,200,true,items);
  } catch (error) {
    handleresult.showResult(res,400,false,error);
  }

});
router.get('/:id',async function (req, res, next) {
  try {
    var item = await models.getItemById(req.params.id);
    handleresult.showResult(res,200,true,item);
  } catch (error) {
    handleresult.showResult(res,400,false,error);
  }
});
router.post('/add',async function (req, res, next) {
  try {
    var item = await models.addAnItem(req.body);
    handleresult.showResult(res,200,true,item);
  } catch (error) {
    handleresult.showResult(res,400,false,error);
  }
});
router.put('/edit/:id',async function (req, res, next) {
  try {
    var item = await models.editAnItem({id:req.params.id,update:req.body});
    handleresult.showResult(res,200,true,item);
  } catch (error) {
    handleresult.showResult(res,400,false,error);
  }    
});
router.delete('/delete/:id',async function (req, res, next) {
  try {
    var item = await models.deleteAnItem(req.params.id);
    handleresult.showResult(res,200,true,item);
  } catch (error) {
    handleresult.showResult(res,400,false,error);
  }    
});

module.exports = router;
