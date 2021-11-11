const router = require('express').Router();

const user = require('../controllers/user.controller');

router.get('/getUserByUid/:uid', user.getUserByUid);
router.post('/createUser', user.createUser);
router.put('/updateUser', user.updateUser);

module.exports = router;