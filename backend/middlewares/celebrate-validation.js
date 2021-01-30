const { isCelebrateError } = require('celebrate');

const celebrateErrorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    res.status(400).send({
      message: 'Переданные данные не корректны',
    });
  }
  next(err);
};

module.exports = celebrateErrorHandler;