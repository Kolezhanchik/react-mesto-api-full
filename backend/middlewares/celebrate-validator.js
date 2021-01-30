const { celebrate, Joi } = require('celebrate');

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
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const userAvatarUpdateValidator =  celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required()
      .regex(/^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/),
  }),
});

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().required(),
  }),
});


const delCardValidator = celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

const addLikeValidator = celebrate({
    body: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  });

const delLikeValidator =   celebrate({
    body: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
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