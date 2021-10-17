const router = require('express').Router();

const apply = require('../controllers/apply.controller');

router.get('/getApplies',apply.getApplies)
router.post('/createApply', apply.createApply);
router.put('/confirmApply/:applyId', apply.confirmApply);

module.exports = router;