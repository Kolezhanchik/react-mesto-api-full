const { isCelebrateError } = require('celebrate');
const { BadRequestError } = require('./error-handler');

const celebrateErrorHandler = (err, next) => {
  if (isCelebrateError(err)) throw new BadRequestError('Переданные данные не корректны');
  next();
};

module.exports = celebrateErrorHandler;
