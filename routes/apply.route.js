const router = require('express').Router();

const apply = require('../controllers/apply.controller');

router.get('/getApplies',apply.getApplies)
router.post('/createApply', apply.createApply);

module.exports = router;