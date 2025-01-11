const express = require('express');
const { config } = require('dotenv');
const mongoose = require('mongoose');

config();

const bookRoutes = require('./routes/book.router')

const app = express();

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`)
)