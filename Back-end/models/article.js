const mongoose = require('mongoose');

const model_article = mongoose.Schema({
  Title: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  creator: { type: ['string <admin_id>'], required: true, unique: false },
  categorie: { type: String, required: true },
  picture: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now },
  update_at: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('articles', model_article);
