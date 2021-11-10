const Campaign = require('../models/campaign.model');
const Card = require('../models/card.model');
const Donation = require('../models/donation.model');
const Recruiter = require('../models/recruiter.model');
const Gift = require('../models/gift.model');
const { findCampaignWithFullPopulate, findAllCampaignsWithFullPopulate } = require('./campaign.controller');
const { sendMail } = require('./recruiter.controller');
const axios = require('axios');
const { findUserByUidWithFullPopulate } = require('./user.controller');

const clearingCredit = (req, res) => {
    axios.post('https://api.invoice4u.co.il/Services/ApiService.svc/ProcessApiRequestV2', {
        "request": {
            "Description": req.body.description,
            "Email": req.body.email,
            "FullName": req.body.fullName,
            "Invoice4UUserApiKey": "70fae535-cd9c-443f-9753-8ae92135688b",
            "PaymentsNum": req.body.paymentsNum,
            "Phone": req.body.phone,
            "ReturnUrl": "http://localhost:3000/",
            // "ReturnUrl": "https://matching-try.herokuapp.com/",
            "Sum": req.body.sum,
            "Type": 1,
            "OrderIdClientUsage": "111222",
            "DocumentType": 3,
            "IsDocCreate": true,
            "IsManualDocCreationsWithParams": true,
            "DocItemName": "test",
            "DocItemQuantity": "1",
            "DocItemPrice": "1",
            "DocItemTaxRate": "17",
            "IsQaMode": false
        }
    }
    ).then(result => {
        res.status(200).send({ url: result.data.d.ClearingRedirectUrl });
        console.log("🚀 ~ file: donation.controller.js ~ line 32 ~ createDonation ~ result", result)
    }).catch(error => {
        console.log("🚀 ~ file: donation.controller.js ~ line 35 ~ createDonation ~ error", error)
    })

}


const createDonation = async (req, res) => {
    try {
        const newDonation = await new Donation(req.body).save();
        const donation = await Donation.findById(newDonation._id).populate([{ path: 'user' }, { path: 'card', populate: { path: 'gift' } }]);
        console.log("🚀 ~ file: donation.controller.js ~ line 9 ~ createDonation ~ donation", donation)
        const card = await Card.findByIdAndUpdate(req.body.card, { $set: { used: true } });
        const updateCampaign = await Campaign.findByIdAndUpdate(req.params.campaignId, { $push: { 'donations': newDonation._id }, $inc: { 'goalRaised': card.sum } });
        let updateRecruiter;
        if (req.body.recruiter)
            updateRecruiter = await Recruiter.findByIdAndUpdate(req.body.recruiter, { $inc: { 'sumRaised': card.sum } });
        const gift = await Gift.findByIdAndUpdate(card.gift, { $inc: { numOfUsed: 1 } });
        if (gift.coupon) {
            const mailOptionsForUser = {
                to: donation.user.email,
                subject: 'שובר על התרומה',
                html: `<div><b>מספר השובר הוא:</b>
                ${gift.coupon}.${gift.numOfUsed}  
                <br></br>
                <span style="background: #FAE01A;">השובר הינו אישי ומיועד לשימוש חד פעמי.</span>
                </div>`
            }
            await sendMail(mailOptionsForUser);
            const mailOptionsForCoupon = {
                to: gift.from,
                subject: 'שימוש נוסף בתרומה שלכם',
                html: `<div><b>מספר השובר הוא:</b>
                ${gift.coupon}.${gift.numOfUsed}  
                <br></br>
                <span style="background: #FAE01A;">השובר הינו אישי ומיועד לשימוש חד פעמי.</span>
                <br></br>
                נשאר לכם סכום של: ${gift.amount - gift.numOfUsed}</div>`
            }
            await sendMail(mailOptionsForCoupon);
        }
        const campaign = await findCampaignWithFullPopulate(req.params.campaignId);
        console.log("🚀 ~ file: donation.controller.js ~ line 10 ~ createDonation ~ campaign", campaign);
        const allCampaigns = await findAllCampaignsWithFullPopulate();
        const user = await findUserByUidWithFullPopulate(req.params.uid);
        res.status(200).send({ campaign, donation, allCampaigns, user });
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
    clearingCredit,
};
