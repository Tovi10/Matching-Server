const router = require('express').Router();

const company = require('../controllers/company.controller');

router.get('/getCompanyById/:id', company.getCompanyById);
router.get('/getAllCompanies', company.getAllCompanies);
router.post('/createCompany', company.createCompany);
router.put('/updateCompany', company.updateCompany);

module.exports = router;