const errorsHandler = (err, req, res, next) => {
    const error = {
      name: err.name,
      statusCode: err.statusCode,
      message: err.message,
    };

    switch(err.name){
      case 'Error' : {
        error.statusCode = 400;
        error.name = 'BadRequestError';
        error.message = err.message||'Неверный запрос';
      }
      break;
      case 'ValidationError' : {
        error.statusCode = 401;
        error.name = 'ValidationError';
        error.message = 'Неверный запрос 401';
      }
      break;
      case 'TypeError' : {
        error.statusCode = 401;
        error.name = 'ValidationError';
        error.message = 'значение имеет не ожидаемый тип';
      }
      break;
      case 'Forbidden' : {
        error.statusCode = 403;
        error.name = 'AuthorizedButForbidden';
        error.message = 'Попытка удалить/редактировать информацию другого пользователя';
      }
      break;
      case 'MongoError' : {
        error.statusCode = 409;
        error.name = 'Conflict';
        error.message = 'Пользователь с таким email адресом уже зарегистрирован';
      }
      break;
      case 'CastError' : {
        error.statusCode = 422;
        error.name = 'CastError';
        error.message = 'Такого пользователя нет в базе';
      }
      break;
      case 'DisconnectedError' : {
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
  };


class badRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
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

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = { NotFoundError, errorsHandler, UnauthorizedError, Conflict, badRequestError };

