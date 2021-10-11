const Campaign = require('../models/campaign.model');
const Donation = require('../models/donation.model');

const createDonation = async (req, res) => {
    try {
        const newDonation = await new Donation(req.body).save();
        const donation = await Donation.findById(newDonation._id);
        console.log("🚀 ~ file: donation.controller.js ~ line 9 ~ createDonation ~ donation", donation)
        const updateCampaign = await Campaign.findByIdAndUpdate(req.params.campaignId, { $push: { 'donations': newDonation._id } });
        const campaign = await Campaign.findById(req.params.campaignId).populate([{ path: 'company' },{ path: 'donations' }, { path: 'cards', populate: { path: 'gift' } }]);;
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
