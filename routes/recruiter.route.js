const router = require('express').Router();

const recruiter = require('../controllers/recruiter.controller');

router.post('/createRecruiter/:campaignId', recruiter.createRecruiter);

module.exports = router;