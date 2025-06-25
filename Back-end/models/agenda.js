const mongoose = require('mongoose');

const model_agenda = mongoose.Schema({
    Title: {type: String, required: true},
    description: {type: String, required: false},
    creator: {type: ["string <admin_id>"], required: true},
    day: {type: String, required: true},
    price: {type: Number, required: true},
    host: {type: String, required: true},
    hours : {type: String, required: true},
    created_at: { type: Date, required: true, default: Date.now },
    update_at: { type: Date, required: true, default: Date.now }
})

module.exports = mongoose.model('agendas', model_agenda);