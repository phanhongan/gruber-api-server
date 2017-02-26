var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Request = mongoose.model('Request', {
    passenger_id: Schema.Types.ObjectId,
    location: Schema.Types.Mixed,
    created_at: {
        type: Date,
        default: new Date()
    }
});
