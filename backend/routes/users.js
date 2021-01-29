const usersRouter = require('express').Router();
const {
  getUsers, getUserByID, getUser, userInfoUpdate, userAvatarUpdate
} = require('../controllers/users');
const {
  getUserByIDValidator, userInfoUpdateValidator, userAvatarUpdateValidator
} = require('../middlewares/celebrate-validator');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUser);
usersRouter.get('/:id', getUserByIDValidator, getUserByID);
usersRouter.get('/me', userInfoUpdateValidator, userInfoUpdate);
usersRouter.patch('/me/avatar', userAvatarUpdateValidator, userAvatarUpdate);

module.exports = usersRouter;
