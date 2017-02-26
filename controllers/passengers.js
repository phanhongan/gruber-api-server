var mongoose = require('mongoose');
var Model = mongoose.model('Passenger');

module.exports = {

    create: function(req, res) {
        if (!req.body.passenger) return res.status(400).end();
        let model = new Model({
            name: req.body.passenger.name
        });
        model.save(function(err, doc) {
            if (err) return res.status(500).send(err);
            if (!doc) return res.status(404).end('not found');
            return res.status(200).send({
                "data": {
                    "id": doc._id,
                    "type": "passenger"
                }
            });
        });
    }

};
