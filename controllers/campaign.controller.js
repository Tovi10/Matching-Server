const Campaign = require('../models/campaign.model');
const Company = require('../models/company.model');

const getAllCampaigns = async (req, res) => {
    try {
        let allCampaigns = await Campaign.find().populate([{ path: 'company' },{ path: 'donations' }, { path: 'cards', populate: { path: 'gift' } }]);
        console.log("🚀 ~ file: campaign.controller.js ~ line 6 ~ getAllCampaigns ~ allCampaigns", allCampaigns);
        res.status(200).send(allCampaigns);
    }
    catch (error) {
        console.log("🚀 ~ file: campaign.controller.js ~ line 8 ~ getAllCampaigns ~ error", error);
        res.status(500).send({ error });
    }
}

const getCampaignById = async (req, res) => {
    try {
        let campaign = await Campaign.findById(req.params.id).populate([{ path: 'company' },{ path: 'donations' }, { path: 'cards', populate: { path: 'gift' } }]);;
        console.log("🚀 ~ file: campaign.controller.js ~ line 6 ~ getCampaignById ~ campaign", campaign)
        res.status(200).send(campaign);
    }
    catch (error) {
        console.log("🚀 ~ file: campaign.controller.js ~ line 10 ~ getCampaignById ~ error", error);
        res.status(500).send({ error });
    }
}
const createCampaign = async (req, res) => {
    try {
        let ansCampaign;
        if (!req.body.company) {
            const newCompany = await new Company(req.body).save();
            console.log("🚀 ~ file: campaign.controller.js ~ line 30 ~ createCampaign ~ newCompany", newCompany);
            ansCampaign = await new Campaign({ ...req.body, company: newCompany._id }).save();
        }
        else {
            ansCampaign = await new Campaign({ ...req.body }).save();
        }
        let campaign = await Campaign.findById(ansCampaign._id).populate([{ path: 'company' },{ path: 'donations' }, { path: 'cards', populate: { path: 'gift' } }]);;
        console.log("🚀 ~ file: campaign.controller.js ~ line 39 ~ createCampaign ~ campaign", campaign)
        res.status(200).send(campaign);
    }
    catch (error) {
        console.log("🚀 ~ file: campaign.controller.js ~ line 31 ~ createCampaign ~ error", error);
        res.status(500).send({ error });
    }
}

const updateCampaign = async (req, res) => {
    try {
        let updateCampaign = await Campaign.findByIdAndUpdate(req.body._id, req.body);
        console.log("🚀 ~ file: campaign.controller.js ~ line 50 ~ updateCampaign ~ updateCampaign", updateCampaign);
        let campaign = await Campaign.findById(updateCampaign._id).populate([{ path: 'company' },{ path: 'donations' }, {
            path: 'cards', populate: { path: 'gift' }
        }]);;
        res.status(200).send(campaign);
    }
    catch (error) {
        console.log("🚀 ~ file: campaign.controller.js ~ line 45 ~ updateCampaign ~ error", error);
        res.status(500).send({ error });
    }
}

module.exports = {
    getCampaignById,
    getAllCampaigns,
    createCampaign,
    updateCampaign,
};
