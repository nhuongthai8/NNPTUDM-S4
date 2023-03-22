var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.use('/items',require('./items'));
router.use('/careers',require('./careers'));
module.exports = router;
