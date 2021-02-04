/* eslint-disable no-lone-blocks, max-classes-per-file */
const errorsHandler = (err, req, res, next) => {
  const error = {
    name: err.name,
    statusCode: err.statusCode,
    message: err.message,
  };
console.log(err);
  switch (err.name) {
    case 'Error': {
      error.statusCode = 400;
      error.name = 'BadRequestError';
      error.message = err.message || 'Неверный запрос';
    }
      break;
      case 'UnauthorizedError': {
        error.statusCode = 401;
        error.name = 'UnauthorizedError';
        error.message = 'Неверный email и/или пароль';
      }
        break;
    case 'ValidationError': {
      error.statusCode = 401;
      error.name = 'ValidationError';
      error.message = 'Неверный запрос 401';
    }
      break;
    case 'TypeError': {
      error.statusCode = 404;
      error.name = 'ValidationError';
      error.message = 'Запрашиваемый ресурс не найден';
    }
      break;
    case 'Forbidden': {
      error.statusCode = 403;
      error.name = 'AuthorizedButForbidden';
      error.message = 'Попытка удалить/редактировать информацию другого пользователя';
    }
      break;
    case 'MongoError': {
      error.statusCode = 409;
      error.name = 'Conflict';
      error.message = 'Пользователь с таким email адресом уже зарегистрирован';
    }
      break;
    case 'CastError': {
      error.statusCode = 404;
      error.name = 'CastError';
      error.message = 'Такого ID нет в базе';
    }
      break;
    case 'DisconnectedError': {
      error.statusCode = 503;
      error.name = 'ConnectionError';
      error.message = 'Нет доступа к базе данных';
    }
      break;
    default: {
      error.statusCode = 500;
      error.name = 'ServerError';
      error.message = 'На сервере произошла ошибка';
    }
      break;
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
