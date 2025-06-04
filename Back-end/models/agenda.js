const mongoose = require('mongoose');

const model_agenda = mongoose.Schema({
    id_agenda: {type: String, required: true, unique:true},
    Title: {type: String, required: true},
    description: {type: String, required: true, unique:true},
    creator: {type: ["string <admin_id>"], required: true, unique:true},
    day: {type: Date, required: true},
    price: {type: Number, required: true},
    created_at: { type: Date, required: true, default: Date.now },
    update_at: { type: Date, required: true, default: Date.now }
})

module.exports = mongoose.model('modelAgenda', model_agenda);