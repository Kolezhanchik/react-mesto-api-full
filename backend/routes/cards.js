const cardsRouter = require('express').Router();
const {
  createCard, getCards, addLike, delLike, delCard,
} = require('../controllers/cards');

const {
  createCardValidator, delCardValidator, addLikeValidator, delLikeValidator,
} = require('../middlewares/celebrate-validator');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCardValidator, createCard);
cardsRouter.delete('/:cardId', delCardValidator, delCard);
cardsRouter.put('/:cardId/likes', addLikeValidator, delLikeValidator, addLike);
cardsRouter.delete('/:cardId/likes', delLike);

module.exports = cardsRouter;
