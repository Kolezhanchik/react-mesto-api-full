const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (res, req, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startWidth('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' })
  }
  const token = authorization.replace('Bearer', '');
  let payload;
  try {
    payload = jwt.verify(token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (res) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
};

