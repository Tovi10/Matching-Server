const router = require('express').Router();

const gift = require('../controllers/gift.controller');

router.get('/getGiftById/:id', gift.getGiftById);
router.get('/getAllGifts', gift.getAllGifts);
router.post('/createGift', gift.createGift);
router.put('/updateGift', gift.updateGift);
router.delete('/deleteGift/:id', gift.deleteGift);

module.exports = router;