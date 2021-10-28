const Campaign = require('../models/campaign.model');
const Card = require('../models/card.model');
const Donation = require('../models/donation.model');
const Recruiter = require('../models/recruiter.model');
const Gift = require('../models/gift.model');
const { findCampaignWithFullPopulate } = require('./campaign.controller');
const { sendMail } = require('./recruiter.controller');

const createDonation = async (req, res) => {
    try {
        const newDonation = await new Donation(req.body).save();
        const donation = await Donation.findById(newDonation._id).populate([{ path: 'user' }, { path: 'card', populate: { path: 'gift' } }]);
        console.log("🚀 ~ file: donation.controller.js ~ line 9 ~ createDonation ~ donation", donation)
        const card = await Card.findById(req.body.card);
        const updateCampaign = await Campaign.findByIdAndUpdate(req.params.campaignId, { $push: { 'donations': newDonation._id }, $inc: { 'goalRaised': card.sum } });
        let updateRecruiter;
        if (req.body.recruiter)
            updateRecruiter = await Recruiter.findByIdAndUpdate(req.body.recruiter, { $inc: { 'sumRaised': card.sum } });
        const gift = await Gift.findByIdAndUpdate(card.gift, { $inc: { numOfUsed: 1 } });
        if (gift.coupon) {
            const mailOptionsForUser = {
                to: donation.user.email,
                subject: 'שובר על התרומה',
                html: `מספר השובר הוא:
                ${gift.coupon}.${gift.numOfUsed}  
                השובר הינו אישי ומיועד לשימוש חד פעמי`
            }
            await sendMail(mailOptionsForUser);
            const mailOptionsForCoupon = {
                to: gift.from,
                subject: 'שימוש נוסף בתרומה שלכם',
                html: `מספר השובר הוא:
                ${gift.coupon}.${gift.numOfUsed}  
                השובר הינו אישי ומיועד לשימוש חד פעמי
                נשאר לכם סכום של ${gift.amount - gift.numOfUsed}`
            }
            await sendMail(mailOptionsForCoupon);
        }
        const campaign = await findCampaignWithFullPopulate(req.params.campaignId);
        console.log("🚀 ~ file: donation.controller.js ~ line 10 ~ createDonation ~ campaign", campaign)
        res.status(200).send({ campaign, donation });
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
