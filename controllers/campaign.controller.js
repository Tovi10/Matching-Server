const Campaign = require('../models/campaign.model');
const Card = require('../models/card.model');
const Company = require('../models/company.model');
const Donation = require('../models/donation.model');
const Recruiter = require('../models/recruiter.model');
const User = require('../models/user.model');

const findAllCampaignsWithFullPopulate = async () => {
    return await Campaign.find().populate([
        { path: 'company' },
        {
            path: 'donations',
            populate: [
                {
                    path: 'card',
                    populate:
                        { path: 'gift' }
                },
                { path: 'user' },
                {
                    path: 'recruiter',
                    populate:
                        { path: 'user' }
                },]
        },
        {
            path: 'recruiters',
            populate: { path: 'user' }
        },
        {
            path: 'cards',
            populate:
                { path: 'gift' }
        }]);
}

const findCampaignWithFullPopulate = async (id) => {
    return await Campaign.findById(id).populate([
        { path: 'company' },
        {
            path: 'donations',
            populate: [
                {
                    path: 'card',
                    populate:
                        { path: 'gift' }
                },
                { path: 'user' },
                {
                    path: 'recruiter',
                    populate:
                        { path: 'user' }
                }]
        }, {
            path: 'recruiters',
            populate:
                { path: 'user' }
        },
        {
            path: 'cards',
            populate:
                { path: 'gift' }
        }]);;
}

const getAllCampaigns = async (req, res) => {
    try {
        // edit all campaigns duration
        // let c = await Campaign.find({});
        // await c.forEach(cc => {
        //     cc.duration = ['01/01/2021', '01/03/2021'];
        //     cc.save();
        // })
        const allCampaigns = await findAllCampaignsWithFullPopulate();
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
        res.status(200).send({ campaign, user });
    }
    catch (error) {
        console.log("🚀 ~ file: campaign.controller.js ~ line 31 ~ createCampaign ~ error", error);
        res.status(500).send({ error });
    }
}

const updateCampaign = async (req, res) => {
    try {
        const updateCampaign = await Campaign.findByIdAndUpdate(req.body._id, req.body);
        console.log("🚀 ~ file: campaign.controller.js ~ line 50 ~ updateCampaign ~ updateCampaign", updateCampaign);
        const campaign = await findCampaignWithFullPopulate(updateCampaign._id);
        console.log("🚀 ~ file: campaign.controller.js ~ line 85 ~ updateCampaign ~ campaign", campaign)
        const allCampaigns = await findAllCampaignsWithFullPopulate();
        console.log("🚀 ~ file: campaign.controller.js ~ line 124 ~ updateCampaign ~ allCampaigns", allCampaigns)
        res.status(200).send({ campaign, allCampaigns });
    }
    catch (error) {
        console.log("🚀 ~ file: campaign.controller.js ~ line 45 ~ updateCampaign ~ error", error);
        res.status(500).send({ error });
    }
}

const deleteCampaign = async (req, res) => {
    try {
        const deleteCampaign = await Campaign.findByIdAndDelete(req.params._id);
        console.log("🚀 ~ file: campaign.controller.js ~ line 136 ~ deleteCampaign ~ deleteCampaign", deleteCampaign)
        if (deleteCampaign) {
            // {"breed" : { $in : ["Pitbull", "Great Dane", "Pug"]}}
            const cardsToDelete = await Card.deleteMany({ _id: { $in: deleteCampaign.cards } })
            console.log("🚀 ~ file: campaign.controller.js ~ line 141 ~ deleteCampaign ~ cardsToDelete", cardsToDelete)
            const recruitersToDelete = await Recruiter.deleteMany({ _id: { $in: deleteCampaign.recruiters } })
            console.log("🚀 ~ file: campaign.controller.js ~ line 143 ~ deleteCampaign ~ recruitersToDelete", recruitersToDelete);
        }
        const allCampaigns = await findAllCampaignsWithFullPopulate();
        console.log("🚀 ~ file: campaign.controller.js ~ line 150 ~ deleteCampaign ~ allCampaigns", allCampaigns)
        res.status(200).send(allCampaigns);
    } catch (error) {
        console.log("🚀 ~ file: campaign.controller.js ~ line 150 ~ deleteCampaign ~ error", error)
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
    deleteCampaign,
};
