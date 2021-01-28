const usersRouter = require('express').Router();
const {
  getUsers, getUserByID, userInfoUpdate, userAvatarUpdate
} = require('../controllers/users');
const {
  getUserByIDValidator, userInfoUpdateValidator, userAvatarUpdateValidator
} = require('../middlewares/celebrate-validator');

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserByIDValidator, getUserByID);
usersRouter.patch('/me', userInfoUpdateValidator, userInfoUpdate);
usersRouter.patch('/me/avatar', userAvatarUpdateValidator, userAvatarUpdate);

module.exports = usersRouter;
