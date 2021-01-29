const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { NotFoundError, UnauthorizedError, Conflict, badRequestError } = require('../middlewares/error-handler');
const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        throw new NotFoundError('Пользователей в базе нет');
      }
      res.status(200).send(users);
    })
    .catch(next);
};

const getUserByID = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send(user);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
console.log(req.params.id);
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
      throw new NotFoundError('Нет пользователя с таким id');
    }
    res.status(200).send(user);
  })
  .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  if (!email || !password) { throw new badRequestError('Не предоставлены email или пароль');}
  User.findOne({email})
  .then((user) => {
    if(user) throw new Conflict('Пользователь с таким email адресом уже зарегистрирован');
  })
  bcrypt.hash(password, 10)
  .then((hash) =>
    User.create({ name, about, avatar, email, password: hash })
    .then(({_id, email}) => {
      res.status(200).send({_id, email});
    }))
    .catch(next);
};


const userInfoUpdate = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    name,
    about,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

const userAvatarUpdate = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    avatar,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if(!email||!password) {  throw new UnauthorizedError('Неправильный логин и/или пароль')};
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      // res.cookie('jwt', token, {
      //   maxAge: 3600000 * 24 * 7,
      //   httpOnly: true
      // })
        res.status(200)
        .send({ message: 'авторизация успешна!', _id: user._id, email: user.email, token });
    })
    .catch(next)
};


module.exports = {
  getUsers, getUserByID, getUser, createUser, userInfoUpdate, userAvatarUpdate, login
};
