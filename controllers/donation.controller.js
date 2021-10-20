const Campaign = require('../models/campaign.model');
const Card = require('../models/card.model');
const Donation = require('../models/donation.model');
const { findCampaignWithFullPopulate } = require('./campaign.controller');

const createDonation = async (req, res) => {
    try {
        const newDonation = await new Donation(req.body).save();
        const donation = await Donation.findById(newDonation._id);
        console.log("🚀 ~ file: donation.controller.js ~ line 9 ~ createDonation ~ donation", donation)
        const card = await Card.findById(req.body.card);
        const updateCampaign = await Campaign.findByIdAndUpdate(req.params.campaignId, { $push: { 'donations': newDonation._id }, $inc: { 'goalRaised': card.sum } });
        const campaign = await findCampaignWithFullPopulate(req.params.campaignId);
        console.log("🚀 ~ file: donation.controller.js ~ line 10 ~ createDonation ~ campaign", campaign)
        res.status(200).send(campaign);
    }
    catch (error) {
        console.log("🚀 ~ file: donation.controller.js ~ line 14 ~ createDonation ~ error", error)
        res.status(500).send({ error });
    }
}

const getDonationsByRecruiterId = async (req, res) => {
    try {
        let recruiterId = req.params.recruiterId;
        let donations = await Donation.find({ recruiter: recruiterId }).populate([
            { path: 'user' },
            {
                path: 'recruiter',
                populate: [{ path: 'user' }, { path: 'campaign' }]
            },
            {
                path: 'card',
                populate: { path: 'gift' }
            }]);;
        console.log("🚀 ~ file: donation.controller.js ~ line 27 ~ getDonationsByRecruiterId ~ donations", donations)
        res.status(200).send(donations);
    }
    catch (error) {
        console.log("🚀 ~ file: donation.controller.js ~ line 29 ~ getDonationsByRecruiterId ~ error", error);
        res.status(500).send({ error });
    }
}

module.exports = {
    createDonation,
    getDonationsByRecruiterId,
};
