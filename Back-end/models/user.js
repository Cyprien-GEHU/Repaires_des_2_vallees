const mongoose = require('mongoose');

const model_user = mongoose.Schema({
    id_user: {type: String, required: true, unique:true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    adress: {type: String, required: true, unique:true},
    phone: {type: Number, required: true, unique:true},
    create_at: {type: Date, required: true},
    udpate_at: {type: Date, required: true},
})

module.exports = mongoose.model('modelUser', model_user);