const router = require('express').Router();

const campaign = require('../controllers/campaign.controller');

router.get('/getCampaignById/:id', campaign.getCampaignById);
router.get('/getAllCampaigns', campaign.getAllCampaigns);
router.post('/createCampaign', campaign.createCampaign);
router.put('/updateCampaign', campaign.updateCampaign);
router.delete('/deleteCampaign/:_id/:userId', campaign.deleteCampaign);

module.exports = router;