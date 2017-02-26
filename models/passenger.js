var mongoose = require('mongoose');

var Passenger = mongoose.model('Passenger', {
    name: String,
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    }
});
