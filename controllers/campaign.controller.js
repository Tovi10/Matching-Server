const Campaign = require('../models/campaign.model');
const Company = require('../models/company.model');
const User = require('../models/user.model');

const findAllCampaignsWithFullPopulate = async () => {
    return await Campaign.find().populate([{ path: 'company' },
    {
        path: 'donations',
        populate: [{ path: 'card', populate: { path: 'gift' } }, { path: 'user' }]
    },
    {
        path: 'recruiters',
        populate: { path: 'user' }
    },
    { path: 'cards', populate: { path: 'gift' } }]);;
}

const findCampaignWithFullPopulate = async (id) => {
    return await Campaign.findById(id).populate([{ path: 'company' },
    {
        path: 'donations',
        populate: [{ path: 'card', populate: { path: 'gift' } }, { path: 'user' }]
    }, {
        path: 'recruiters',
        populate: { path: 'user' }
    },
    { path: 'cards', populate: { path: 'gift' } }]);;
}

const getAllCampaigns = async (req, res) => {
    try {
        let allCampaigns = await findAllCampaignsWithFullPopulate();
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
        let campaign = await findCampaignWithFullPopulate(req.params.id);
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
        // if company not exists:
        if (!req.body.company) {
            const newCompany = await new Company(req.body).save();
            console.log("🚀 ~ file: campaign.controller.js ~ line 30 ~ createCampaign ~ newCompany", newCompany);
            ansCampaign = await new Campaign({ ...req.body, company: newCompany._id }).save();
        }
        else {
            ansCampaign = await new Campaign({ ...req.body }).save();
        }
        const user = await User.findByIdAndUpdate(req.body.userId, { $push: { campaigns: ansCampaign._id } });
        console.log("🚀 ~ file: campaign.controller.js ~ line 66 ~ createCampaign ~ user", user)
        const campaign = await findCampaignWithFullPopulate(ansCampaign._id);
        console.log("🚀 ~ file: campaign.controller.js ~ line 39 ~ createCampaign ~ campaign", campaign)
        res.status(200).send({campaign,user});
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
        let campaign = await Campaign.findById(updateCampaign._id).populate([{ path: 'company' }, { path: 'donations' }, {
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
    findAllCampaignsWithFullPopulate,
    findCampaignWithFullPopulate,
    getCampaignById,
    getAllCampaigns,
    createCampaign,
    updateCampaign,
};
