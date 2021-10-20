const router = require('express').Router();

const donation = require('../controllers/donation.controller');

router.post('/createDonation/:campaignId', donation.createDonation);
router.get('/getDonationsByRecruiterId/:recruiterId', donation.getDonationsByRecruiterId);

module.exports = router;