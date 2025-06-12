const mongoose = require('mongoose');

const model_event = mongoose.Schema({
    Title: {type: String, required: true},
    description: {type: String, required: false},
    creator: {type:["string <admin_id>"], required: true},
    picture: {type: String, required: false},
    day: {type: String, required: true},
    created_at: { type: Date, required: true, default: Date.now },
    update_at: { type: Date, required: true, default: Date.now }
})

module.exports = mongoose.model('events', model_event);