const Gift = require('../models/gift.model');

const getGiftById = async (req, res) => {
    try {
        let gift = await Gift.findById(req.params.id);
        console.log("🚀 ~ file: gift.controller.js ~ line 6 ~ getGiftById ~ gift", gift)
        res.status(200).send(gift);
    }
    catch (error) {
        console.log("🚀 ~ file: gift.controller.js ~ line 10 ~ getGiftById ~ error", error);
        res.status(500).send({ error });

    }
}

const getAllGifts = async (req, res) => {
    try {
        let allGift = await Gift.find();
        console.log("🚀 ~ file: gift.controller.js ~ line 19 ~ getAllGift ~ allGift", allGift)
        res.status(200).send(allGift);
    }
    catch (error) {
        console.log("🚀 ~ file: gift.controller.js ~ line 23 ~ getAllGift ~ error", error)
        res.status(500).send({ error });

    }
}

const createGift = async (req, res) => {
    try {
        let ansGift = await new Gift(req.body).save();
        console.log("🚀 ~ file: gift.controller.js ~ line 17 ~ createGift ~ ansGift", ansGift);
        res.status(200).send(ansGift);
    }
    catch (error) {
        console.log("🚀 ~ file: gift.controller.js ~ line 21 ~ createGift ~ error", error);
        res.status(500).send({ error })
    }
}

const updateGift = async (req, res) => {
    try {
        let updateGift = await Gift.findByIdAndUpdate(req.body._id, req.body);
        console.log("🚀 ~ file: gift.controller.js ~ line 44 ~ updateGift ~ updateGift", updateGift)
        let gift = await Gift.findById(updateGift._id);
        console.log("🚀 ~ file: gift.controller.js ~ line 45 ~ updateGift ~ gift", gift)
        res.status(200).send(gift);
    }
    catch (error) {
        console.log("🚀 ~ file: gift.controller.js ~ line 50 ~ updateGift ~ error", error)
        res.status(500).send({ error });
    }
}



module.exports = {
    getGiftById,
    getAllGifts,
    createGift,
    updateGift,
};
