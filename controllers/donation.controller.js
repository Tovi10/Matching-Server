const Campaign = require('../models/campaign.model');
const Card = require('../models/card.model');
const Donation = require('../models/donation.model');
const { findCampaignWithFullPopulate } = require('./campaign.controller');

const createDonation = async (req, res) => {
    try {
        const newDonation = await new Donation(req.body).save();
        const donation = await Donation.findById(newDonation._id);
        console.log("🚀 ~ file: donation.controller.js ~ line 9 ~ createDonation ~ donation", donation)
        const card=await Card.findById(req.body.card);
        const updateCampaign = await Campaign.findByIdAndUpdate(req.params.campaignId, { $push: { 'donations': newDonation._id },$inc:{'goalRaised':card.sum} });
        const campaign = await findCampaignWithFullPopulate(req.params.campaignId);
        console.log("🚀 ~ file: donation.controller.js ~ line 10 ~ createDonation ~ campaign", campaign)
        res.status(200).send(campaign);
    }
    catch (error) {
        console.log("🚀 ~ file: donation.controller.js ~ line 14 ~ createDonation ~ error", error)
        res.status(500).send({ error });
    }
}

module.exports = {
    createDonation,
};
