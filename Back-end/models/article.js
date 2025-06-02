const mongoose = require('mongoose');

const model_article = mongoose.Schema({
    id_article: {type: String, required: true, unique:true},
    Title: {type: String, required: true},
    description: {type: String, required: true, unique:true},
    creator: {type: ["string <admin_id>"], required: true, unique:true},
    picture: {type: String, required: false},
    create_at: {type: Date, required: true},
    udpate_at: {type: Date, required: true},
})

module.exports = mongoose.model('modelArticle', model_article);