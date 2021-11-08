const router = require('express').Router();

const card = require('../controllers/card.controller');

router.get('/getCardById/:id', card.getCardById);
router.get('/getAllCards', card.getAllCards);
router.post('/createCard/:id', card.createCard);
router.put('/updateCard', card.updateCard);
router.delete('/deleteCard/:id/:uid/:gift', card.deleteCard);

module.exports = router;