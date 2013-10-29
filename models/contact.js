var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Contact = new Schema({
    first: { type: String },
    last: { type: String },
    address: { type: String },
    company: { type: String },
    email: { type: String }
});

module.exports = mongoose.model('Contact', Contact);