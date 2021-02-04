/* eslint-disable no-useless-escape, func-names, consistent-return */

const mongoose = require('mongoose');
const validation = require('validator');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../middlewares/error-handler');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Не менее 2 символов'],
    maxlength: [30, 'Не более 30 символов'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Не менее 2 символов'],
    maxlength: [30, 'Не более 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        // eslint-disable-next-line max-len
        // return /https?:\/\/(www\.)?[-a-zA-Z0-9]{2,256}\.[a-z]{1,6}\b([-a-zA-Z0-9-._~:\/?#\[\]@!$&'()*+,;=\S]*)/.test(v);
        return validation.isURL(v);
      },
      message: 'URL введён некорректно.',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validation.isEmail(v);
      },
      message: 'Email введён некорректно.',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неверный email или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неверный email или пароль'));
          }
            return user;

        });
    });
};




module.exports = mongoose.model('user', userSchema);
