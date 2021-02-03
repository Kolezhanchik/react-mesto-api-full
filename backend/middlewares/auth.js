const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { AuthorizationError } = require('./error-handler');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) throw new AuthorizationError('Необходима авторизация, нет токена');

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new AuthorizationError('Необходима авторизация, токен не валиден');
  }

  req.user = payload;
  next();
};
