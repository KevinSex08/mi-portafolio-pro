const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, //  usuario
  password: { type: String, required: true } //  contraseña
});

module.exports = mongoose.model('User', UserSchema);