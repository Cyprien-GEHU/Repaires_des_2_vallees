const mongoose = require('mongoose');

const model_event = mongoose.Schema({
    id_event: {type: String, required: true, unique:true},
    Title: {type: String, required: true},
    description: {type: String, required: true, unique:true},
    creator: {type:["string <admin_id>"], required: true, unique:true},
    picture: {type: String, required: false},
    day: {type: Date, required: true},
    created_at: { type: Date, required: true, default: Date.now },
    update_at: { type: Date, required: true, default: Date.now }
})

module.exports = mongoose.model('modelEvent', model_event);