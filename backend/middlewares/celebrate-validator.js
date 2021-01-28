const { celebrate, Joi } = require('celebrate');

// const idParams = {
//   params: Joi.object().keys({
//     id: Joi.string().length(24).required(),
//   }),
// };

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
});

const createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
  }),
});

const getUserByIDValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).required(),
  }),
});

const userInfoUpdateValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required,
    about: Joi.string().min(2).max(30).required,
  }),
});

const userAvatarUpdateValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().required,
  }),
});

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().required(),
  }),
});

const delCardValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).required(),
  }),
  cookies: Joi.object().keys({
    jwt: Joi.string().required(),
  }).unknown(),
});

const addLikeValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).required(),
  }),
});

const delLikeValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).required(),
  }),
});

module.exports = {
  loginValidator,
  createUserValidator,
  getUserByIDValidator,
  userInfoUpdateValidator,
  userAvatarUpdateValidator,
  createCardValidator,
  delCardValidator,
  addLikeValidator,
  delLikeValidator
};