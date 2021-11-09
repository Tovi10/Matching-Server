const router = require('express').Router();

const donation = require('../controllers/donation.controller');

router.post('/createDonation/:campaignId/:uid', donation.createDonation);
router.get('/getDonationsByRecruiterId/:recruiterId', donation.getDonationsByRecruiterId);
router.post('/clearingCredit', donation.clearingCredit);

module.exports = router;