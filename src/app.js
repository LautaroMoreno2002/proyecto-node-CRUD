const express = require('express');
const { config } = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

config();

const bookRoutes = require('./routes/book.router')

// Usamos express para los middlewares
const app = express();
app.use(bodyParser.json()) // Parseador de Bodies

// Acá conectaremos la base de datos
mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME })
const db = mongoose.connection;

// Si la ruta es .../books usa bookRoutes
app.use('/books', bookRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`)
)