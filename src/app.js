const express = require('express');
const colors = require('colors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const homeRouter = require('./routes/home');
const authRouter = require('./routes/auth')

const app = express();

// leer variables de entorno
require('dotenv').config();
// leer conexion a la base de datos
require("./database/db");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/auth', authRouter);


module.exports = app;
