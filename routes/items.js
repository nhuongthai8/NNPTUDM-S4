var express = require('express');
var router = express.Router();
var models = require('../models/items');
var handleresult = require('../configs/handleResult');
const { body, validationResult } = require('express-validator');
var MSG = require('../configs/notifies');
var util = require('util');


/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    var items = await models.getAllItem();
    handleresult.showResult(res, 200, true, items);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }

});
router.get('/:id', async function (req, res, next) {
  try {
    var item = await models.getItemById(req.params.id);
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.post('/add',
  body('name').isLength({ min: 10, max: 1000 }).withMessage(util.format(MSG.MSG_LENGTH,'name',10,1000)),
  body('phone').isLength({ max: 10, min: 10 }).withMessage(util.format(MSG.MSG_SDT,10))
  , async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return handleresult.showResult(res, 400, false, { errors: errors.array() });
      }
      var item = await models.addAnItem(req.body);
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  });
router.put('/edit/:id', async function (req, res, next) {
  try {
    var item = await models.editAnItem({ id: req.params.id, update: req.body });
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.delete('/delete/:id', async function (req, res, next) {
  try {
    var item = await models.deleteAnItem(req.params.id);
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});

module.exports = router;
