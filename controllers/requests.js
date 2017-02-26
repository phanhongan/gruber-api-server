var mongoose = require('mongoose');
var Model = mongoose.model('Request');

var Driver = mongoose.model('Driver');

module.exports = {

    create: function(req, res) {
        if (!req.body.request) return res.status(400).end();
        if (!req.body.request.location) return res.status(400).end();
        let loc = {
            type: 'Point',
            coordinates:[req.body.request.location.lng, req.body.request.location.lat]
        };
        var model = new Model({
            location: loc
        });
        model.save(function(err, doc) {
            if (err) return res.status(500).send(err);
            Driver.find({
                location: {
                    $nearSphere: {
                        $geometry: loc,
                        $maxDistance: 5000
                    }
                },
                state: 'available'
            }).limit(5).exec(function (err, docs) {
                if (err) return res.status(500).send(err);
                console.log(docs);
                return res.status(200).send({
                    data: docs.map(m => {
                        return {
                            id: m._id,
                            type: 'driver',
                            location: m.location
                        }
                    })
                });
            });
        });

    }

};
