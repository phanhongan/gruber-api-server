var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Location = mongoose.model('Location', {
    uid: Schema.Types.ObjectId,
    _type: String,
    location: Schema.Types.Mixed,
    created_at: {
        type: Date,
        default: new Date()
    }
});
