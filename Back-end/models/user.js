const mongoose = require('mongoose');

const model_user = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  created_at: { type: Date, required: true, default: Date.now },
  update_at: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('user', model_user);
