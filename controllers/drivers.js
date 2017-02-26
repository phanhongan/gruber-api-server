var mongoose = require('mongoose');
var Model = mongoose.model('Driver');

var Location = mongoose.model('Location');

module.exports = {

    create: function(req, res) {
        if (!req.body.driver) return res.status(400).end();
        let model = new Model({
            name: req.body.driver.name
        });
        model.save(function(err, doc) {
            if (err) return res.status(500).send(err);
            return res.status(200).send({
                "data": {
                    "id": doc._id,
                    "type": "driver"
                }
            });
        });
    },

    update: function(req, res) {
        if (!req.body.driver) return res.status(400).end();
        let state = req.body.driver.state;
        Model.findByIdAndUpdate(req.params.id, { $set: { state: state } }, { new: true }, function(err, doc) {
            if (err) return res.status(500).send(err);
            if (!doc) return res.status(404).end('not found');
            return res.status(200).send({
                "data": {
                    "id": doc._id,
                    "type": "driver",
                    "state": doc.state
                }
            });
        });
    },

    updateLocation: function(req, res) {
        if (!req.body.location) return res.status(400).end();
        let loc = {
            type: 'Point',
            coordinates: [req.body.location.lng, req.body.location.lat]
        };
        Model.findByIdAndUpdate(req.params.id, {
            $set: {
                location: loc
            }
        }, { new: true }, function (err, doc) {
            if (err) return res.status(500).send(err);
            if (!doc) return res.status(404).end('not found');
            let location = new Location({
                uid: doc._id,
                _type: 'driver',
                location: loc
            });
            location.save(function(err, doc) {
                if (err) return res.status(500).send(err);

                res.status(200).send({
                    "data": {
                        "id": doc._id,
                        "type": "driver",
                        "attributes": {
                            "location": doc.location
                        }
                    }
                });

                // Push location data into a message queue
            });
        });
    }

};
