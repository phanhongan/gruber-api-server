var express = require('express');
var router = express.Router();

var controller = require('../controllers/drivers');

router.post('/', controller.create);
router.patch('/:id', controller.update);

router.put('/:id/locations', controller.updateLocation);

module.exports = router;
