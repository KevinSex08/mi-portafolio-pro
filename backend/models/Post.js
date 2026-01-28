// backend/models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  contenido: {
    type: String,
    required: true // Aquí irá el texto largo del blog
  },
  imagen: {
    type: String, // URL de una imagen de portada (opcional)
    default: "https://via.placeholder.com/800x400.png?text=Blog+Post"
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);