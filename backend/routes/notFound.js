const notFoundRouter = require('express').Router();
const { NotFoundError } = require('../middlewares/error-handler');

notFoundRouter.all('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = notFoundRouter;
