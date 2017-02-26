var express = require('express');
var router = express.Router();

var controller = require('../controllers/passengers');

router.post('/', controller.create);

module.exports = router;
