const express = require('express');
const router = express.Router()
const Book = require('../models/book.model');
const bookModel = require('../models/book.model');

// MIDDLEWARE
// Para poder tomar UN solo libro
const getBook = async (req,res,next) => {
  let book;
  const { id } = req.params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({
      message: 'El ID del libro no es válido'
    })
  }
  try {
    book = await bookModel.findById(id);
    if (!book){
      return res.status(404).json({
        message: 'El libro no fue encontrado'
    })
    }
  } catch (err) {
    return res.status(500).json({
        message: err.message
    })
  }
  res.book = book;
  next()
}

// Obtener todos los libros
router.get('/', async (req, res) => {
  try {
    const books = await Book.find(); // Encuentra todos los libros
    console.log('GET ALL', books);
    
    if (books.lenght === 0) 
      { res.status(204).json([])}
    res.json(books) // Da 200
  } catch (error) {
    res.status(500).json({
      message: "HOLAA " + error.message
    })
  }
})

// Crear un nuevo libro (recurso)
router.post('/', async (req, res) => {
  const { title, author, genre, publication_date } = req?.body
  if (!title || !author || !genre || !publication_date)
    return res.status(400).json({
      message: 'Los campos título, autor, género y fecha son obligatorios'
    })
  const book = new Book(
    {
      title,
      author,
      genre,
      publication_date
    }
  )
  try {
    const newBook = await book.save();
    console.log(newBook);    
    res.status(201).json(newBook)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }  
})

// GET INDIDUAL
router.get('/:id', getBook, async (req, res) => {
  res.json(res.book)
})

router.put('/:id', getBook, async (req, res) => {
  try {
    const book = res.book
    book.title = req.body.title || book.title
    book.author = req.body.author || book.author
    book.genre = req.body.genre || book.genre
    book.publication_date = req.body.publication_date || book.publication_date

    const updateBook = await book.save()
    res.json(updateBook)
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
})

router.patch('/:id', getBook, async (req, res) => {
  if (!req.body.title && !req.body.author && !req.body.genre && !req.body.publication_date) {
    res.status(400).json({
      message: "Al menos uno de los parámetros debe estar completo: Título, Autor, Género o Fecha de publicación."
    })
  } else {
    try {
      const book = res.book
      book.title = req.body.title || book.title
      book.author = req.body.author || book.author
      book.genre = req.body.genre || book.genre
      book.publication_date = req.body.publication_date || book.publication_date
  
      const updateBook = await book.save()
      res.json(updateBook)
    } catch (err) {
      res.status(400).json({
        message: err.message
      })
    }
  }
})

router.delete('/:id', getBook, async (req, res) => {
  try {
    const book = res.book;
    await book.deleteOne({
      _id: book._id
    });
    res.json({
      message: `El libro ${book.title} fue eliminado correctamente`
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})
module.exports = router