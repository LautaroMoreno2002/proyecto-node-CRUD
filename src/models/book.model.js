import mongoose from "mongoose";

// Inicializo la tabla en MongoDB
export const bookSchema = mongoose.Schema(
  {
    title: String,
    author: String,
    genre: String,
    publication_date: String
  }
)