const Card = require('../models/card');
const { NotFoundError, WrongIdError, AuthorizedButForbidden } = require('../middlewares/error-handler');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (cards.length === 0) {
        throw new NotFoundError('Нет карточек');
      }
      res.status(200).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch(next);
};

const delCard = (req, res, next) => {
  const _id = req.params.cardId;
  if (!_id || _id.length !== 24) throw new WrongIdError('Неправильный ID');
  Card.findByIdAndRemove(_id)
    .then((card) => {
      if (!card.owner.equals(req.user._id)) throw new AuthorizedButForbidden('Попытка удалить/редактировать информацию другого пользователя');
      if (!card) {
        throw new NotFoundError('Нет карточки с таким ID');
      }
      res.status(200).send(card);
    })
    .catch(next);
};

const addLike = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  if (!cardId || cardId.length !== 24) throw new WrongIdError('Неправильный ID');
  Card.findByIdAndUpdate(cardId, {
    $addToSet: {
      likes: _id,
    },
  },
  {
    runValidators: true,
    new: true,
  })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким ID');
      }
      res.status(200).send(card);
    })
    .catch(next);
};

const delLike = (req, res, next) => {
  const { cardId } = req.params;
  if (!cardId || cardId.length !== 24) throw new WrongIdError('Неправильный ID');
  const { _id } = req.user;
  Card.findByIdAndUpdate(cardId, {
    $pull: {
      likes: _id,
    },
  },
  {
    runValidators: true,
    new: true,
  })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким ID');
      }
      res.status(200).send(card);
    })
    .catch(next);
};

module.exports = {
  createCard, getCards, addLike, delLike, delCard,
};
