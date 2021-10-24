const Card = require('../models/card.model');
const Campaign = require('../models/campaign.model');

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
        let campaign = await Campaign.findByIdAndUpdate(req.params.id, { $push: { 'cards': ansCard._id } });
        res.status(200).send(ansCard);
    }
    catch (error) {
        console.log("🚀 ~ file: card.controller.js ~ line 21 ~ createCard ~ error", error);
        res.status(500).send({ error });
    }
}

const updateCard = async (req, res) => {
    try {
        let updateCard = await Card.findByIdAndUpdate(req.body._id, req.body);
        console.log("🚀 ~ file: card.controller.js ~ line 44 ~ updateCard ~ updateCard", updateCard)
        let cards = await Card.find({});
        console.log("🚀 ~ file: card.controller.js ~ line 46 ~ updateCard ~ cards", cards)
        res.status(200).send(cards);
    }
    catch (error) {
        console.log("🚀 ~ file: card.controller.js ~ line 50 ~ updateCard ~ error", error)
        res.status(500).send({ error });
    }
}

module.exports = {
    getCardById,
    getAllCards,
    createCard,
    updateCard,
};
