var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var requireDir = require('require-dir');

var config = requireDir('./config/');
mongoose.connect(config.db.mongodb);

requireDir('./models/');
var routes = requireDir('./routes/');

var app = express();
app.use(bodyParser.json());
app.use(morgan('combined'));

app.use('/drivers', routes.drivers);
app.use('/passengers', routes.passengers);
app.use('/requests', routes.requests);

app.listen(3000, function () {
    console.log('Gruber API listening on port 3000!')
});
