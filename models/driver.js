var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Driver = mongoose.model('Driver', {
    name: String,
    state: String,
    location: Schema.Types.Mixed,
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    }
});
