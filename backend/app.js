/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const notFoundRouter = require('./routes/notFound');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const celebrateErrorHandler = require('./middlewares/celebrate-validation');
const { loginValidator, createUserValidator } = require('./middlewares/celebrate-validator');
const { errorsHandler } = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signup', createUserValidator, createUser);
app.post('/signin', loginValidator, login);
app.use('*', notFoundRouter);

app.use(auth);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.use(errorLogger);
app.use(celebrateErrorHandler);
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
