const router = require('express').Router();

const recruiter = require('../controllers/recruiter.controller')

router.post('/createRecruiter', recruiter.createRecruiter);
router.put('/updateRecruiterDetails/:recruiterId', recruiter.updateRecruiterDetails);

module.exports = router;