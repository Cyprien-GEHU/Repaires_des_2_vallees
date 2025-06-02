const mongoose = require('mongoose');

const model_agenda = mongoose.Schema({
    id_agenda: {type: String, required: true, unique:true},
    Title: {type: String, required: true},
    description: {type: String, required: true, unique:true},
    creator: {type: ["string <admin_id>"], required: true, unique:true},
    day: {type: Date, required: true},
    create_at: {type: Date, required: true},
    udpate_at: {type: Date, required: true},
})

module.exports = mongoose.model('modelAgenda', model_agenda);