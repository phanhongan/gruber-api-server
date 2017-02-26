var express = require('express');
var router = express.Router();

var controller = require('../controllers/requests');

router.post('/', controller.create);

module.exports = router;
