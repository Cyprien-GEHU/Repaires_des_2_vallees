const mongoose = require('mongoose');

const model_admin = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    rule: {type: String, required: true},
    created_at: { type: Date, required: true, default: Date.now },
    update_at: { type: Date, required: true, default: Date.now }
})

module.exports = mongoose.model('admins', model_admin);