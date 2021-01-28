const { isCelebrateValid } = require('celebrate');

const celebrateErrorHandler = (err, req, res, next) => {
  if (isCelebrateValid(err)) {
    res.status(400).send({
      message: 'Переданные данные не корректны',
    });
  }
  next(err);
};

module.exports = celebrateErrorHandler;