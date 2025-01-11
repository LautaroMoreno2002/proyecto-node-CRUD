const mongoose = require('mongoose');

// Inicializo la tabla en MongoDB
const bookSchema = mongoose.Schema(
  {
    title: String,
    author: String,
    genre: String,
    publication_date: String
  }
)

module.exports = mongoose.model('Book', bookSchema) // Exporta como un mongoose model