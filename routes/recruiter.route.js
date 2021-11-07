const router = require('express').Router();

const recruiter = require('../controllers/recruiter.controller')

router.post('/createRecruiter', recruiter.createRecruiter);
router.put('/updateRecruiterDetails/:recruiterId', recruiter.updateRecruiterDetails);
router.get('/getRecruiterById/:id', recruiter.getRecruiterById);
router.put('/updateRecruiter/:uid', recruiter.updateRecruiter);
router.delete('/deleteRecruiter/:id/:uid', recruiter.deleteRecruiter);

module.exports = router;