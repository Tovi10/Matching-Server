const Card = require('../models/card.model');
const Campaign = require('../models/campaign.model');
const Gift = require('../models/gift.model');
const { findAllCampaignsWithFullPopulate } = require('./campaign.controller');
const { findUserByUidWithFullPopulate } = require('./user.controller');

const getCardById = async (req, res) => {
    try {
        let card = await Card.findById(req.params.id).populate('gift');
        console.log("🚀 ~ file: card.controller.js ~ line 6 ~ getCardById ~ card", card);
        res.status(200).send(card);
    }
    catch (error) {
        console.log("🚀 ~ file: card.controller.js ~ line 10 ~ getCardById ~ error", error);
        res.status(500).send({ error });
    }
}

const getAllCards = async (req, res) => {
    try {
        let allCards = await Card.find().populate('gift');
        console.log("🚀 ~ file: card.controller.js ~ line 17 ~ getAllCards ~ allCards", allCards);
        res.status(200).send(allCards);
    }
    catch (error) {
        console.log("🚀 ~ file: card.controller.js ~ line 21 ~ getAllCards ~ error", error);
        res.status(500).send({ error });
    }
}

const createCard = async (req, res) => {
    try {
        let ansCard = await new Card(req.body).save();
        console.log("🚀 ~ file: card.controller.js ~ line 31 ~ createCard ~ ansCard", ansCard);
        const gift = await Gift.findByIdAndUpdate(req.body.gift, { $set: { used: true } });
        console.log("🚀 ~ file: card.controller.js ~ line 36 ~ createCard ~ gift", gift)
        let campaign = await Campaign.findByIdAndUpdate(req.params.id, { $push: { 'cards': ansCard._id } });
        console.log("🚀 ~ file: card.controller.js ~ line 38 ~ createCard ~ campaign", campaign)
        const allCampaigns = await findAllCampaignsWithFullPopulate();
        const user = await findUserByUidWithFullPopulate(req.params.uid)
        res.status(200).send({user,allCampaigns});
    }
    catch (error) {
        console.log("🚀 ~ file: card.controller.js ~ line 21 ~ createCard ~ error", error);
        res.status(500).send({ error });
    }
}

const updateCard = async (req, res) => {
    try {
        const checkCard = await Card.findById(req.body.id);
        if (checkCard.used) {
            throw Error('הכרטיס בשימוש!')
        }
        let updateCard = await Card.findByIdAndUpdate(req.body._id, req.body);
        console.log("🚀 ~ file: card.controller.js ~ line 44 ~ updateCard ~ updateCard", updateCard)
        let cards = await Card.find({});
        console.log("🚀 ~ file: card.controller.js ~ line 46 ~ updateCard ~ cards", cards)
        const campaigns = await findAllCampaignsWithFullPopulate();
        console.log("🚀 ~ file: card.controller.js ~ line 49 ~ updateCard ~ campaigns", campaigns)
        const user = await findUserByUidWithFullPopulate(req.body.uid);
        console.log("🚀 ~ file: card.controller.js ~ line 52 ~ updateCard ~ user", user)
        res.status(200).send({ cards, campaigns, user });
    }
    catch (error) {
        console.log("🚀 ~ file: card.controller.js ~ line 50 ~ updateCard ~ error", error)
        res.status(500).send({ error });
    }
}


const deleteCard = async (req, res) => {
    try {
        const checkCard = await Card.findById(req.params.id);
        console.log("🚀 ~ file: card.controller.js ~ line 75 ~ deleteCard ~ checkCard", checkCard)
        if (checkCard.used) {
            throw Error('הכרטיס בשימוש!')
        }
        const card = await Card.findByIdAndDelete(req.params.id);
        console.log("🚀 ~ file: card.controller.js ~ line 65 ~ deleteCard ~ card", card);
        const campaign=await Campaign.findByIdAndUpdate(req.params.campaignId,{$pull:{cards:req.params.id}});
        console.log("🚀 ~ file: card.controller.js ~ line 81 ~ deleteCard ~ campaign", campaign)
        const campaigns = await findAllCampaignsWithFullPopulate();
        console.log("🚀 ~ file: card.controller.js ~ line 67 ~ deleteCard ~ campaigns", campaigns)
        const user = await findUserByUidWithFullPopulate(req.params.uid);
        console.log("🚀 ~ file: card.controller.js ~ line 69 ~ deleteCard ~ user", user)
        // check if this gift isnt in used
        const cardWithSameGift = await Card.findOne({ gift: req.params.gift });
        console.log("🚀 ~ file: card.controller.js ~ line 80 ~ deleteCard ~ cardWithSameGift", cardWithSameGift)
        if (!cardWithSameGift) {
            const gift = await Gift.findByIdAndUpdate(req.params.gift, { $set: { used: false } });
            console.log("🚀 ~ file: card.controller.js ~ line 83 ~ deleteCard ~ gift", gift)
        }
        const allGifts=await Gift.find({});
        res.status(200).send({ card, user, campaigns,allGifts });
    }
    catch (error) {
        console.log("🚀 ~ file: card.controller.js ~ line 73 ~ deleteCard ~ error", error)
        res.status(500).send({ error });
    }
}

module.exports = {
    getCardById,
    getAllCards,
    createCard,
    updateCard,
    deleteCard,
};
