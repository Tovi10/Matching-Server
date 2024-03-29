const router = require('express').Router();

const card = require('../controllers/card.controller');

router.get('/getCardById/:id', card.getCardById);
router.get('/getAllCards', card.getAllCards);
router.post('/createCard/:id/:uid', card.createCard);
router.put('/updateCard', card.updateCard);
router.delete('/deleteCard/:id/:uid/:gift/:campaignId', card.deleteCard);

module.exports = router;