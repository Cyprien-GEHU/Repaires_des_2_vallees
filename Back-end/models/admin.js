const mongoose = require('mongoose');

const model_admin = mongoose.Schema({
    id_admin: {type: String, required: true, unique:true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    phone: {type: Number, required: true, unique:true},
    rule: {type: String, required: true},
    create_at: {type: Date, required: true},
    udpate_at: {type: Date, required: true},
})

module.exports = mongoose.model('modelAdmin', model_admin);