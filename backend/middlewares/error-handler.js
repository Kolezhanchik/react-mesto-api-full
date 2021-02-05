/* eslint-disable no-lone-blocks, max-classes-per-file */
const errorsHandler = (err, req, res, next) => {
  const error = {
    name: err.name,
    statusCode: err.statusCode || 500,
    message: err.message || 'Ошибка сервера',
  };

  if (error.name === 'MongoError' && error.statusCode === 500) {
    error.statusCode = 409;
    error.name = 'Conflict';
    error.message = 'Пользователь с таким email адресом уже зарегистрирован';
  }
  if (error.name === 'Error' && error.statusCode === 500) {
    error.statusCode = 400;
    error.name = 'BadRequestError';
    error.message = 'Неверный запрос';
  }
  if (error.name === 'Error' && error.statusCode === 401) {
    error.statusCode = 401;
    error.name = 'UnauthorizedError';
    error.message = 'Неверный запрос';
  }
  if (error.name === 'UnauthorizedError') {
    error.statusCode = 401;
    error.name = 'UnauthorizedError';
    error.message = err.message || 'Неверный email и/или пароль';
  }
  if (error.name === 'Error' && error.statusCode === 403) {
    error.statusCode = 403;
    error.name = 'AuthorizedButForbidden';
    error.message = 'Попытка удалить/редактировать информацию другого пользователя';
  }
  if (error.name === 'Error' && error.statusCode === 404) {
    error.statusCode = 404;
    error.name = 'Not Found';
    error.message = err.message || 'Нет такого id';
  }
  if (error.name === 'TypeError' && error.statusCode === 500) {
    error.statusCode = 400;
    error.name = 'CastError';
    error.message = 'Такого ID нет в базе';
  }
  if (error.name === 'CastError' && error.statusCode === 500) {
    error.statusCode = 404;
    error.name = 'CastError';
    error.message = 'Такого ID нет в базе';
  }
  if (error.name === 'CastError' && error.statusCode === 400) {
    error.statusCode = 404;
    error.name = '';
    error.message = 'Неверный запрос';
  }

  if (error.name === 'Error' && error.statusCode === 400) {
    error.statusCode = 403;
    error.name = '';
    error.message = 'Неверный запрос';
  }
  if (error.name === 'ValidationError') {
    error.statusCode = 401;
    error.name = 'ValidationError';
    error.message = 'Неверный запрос';
  }
  if (error.name === 'ValidationError') {
    error.statusCode = 404;
    error.name = 'ValidationError';
    error.message = 'Запрашиваемый ресурс не найден';
  }
  if (error.name === 'ValidationError') {
    error.statusCode = 503;
    error.name = 'ConnectionError';
    error.message = 'Нет доступа к базе данных';
  }

  res.status(error.statusCode).send({ message: error.message });
  next();
};

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class AuthorizedButForbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
class WrongIdError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = {
  WrongIdError,
  AuthorizedButForbidden,
  NotFoundError,
  errorsHandler,
  AuthorizationError,
  UnauthorizedError,
  Conflict,
  BadRequestError,
};
