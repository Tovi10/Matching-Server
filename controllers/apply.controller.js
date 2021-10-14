const Apply = require("../models/apply.model");

const createApply = async (req, res) => {
    try {
        const apply = await new Apply(req.body).save();
        console.log("🚀 ~ file: apply.controller.js ~ line 6 ~ createApply ~ apply", apply)
        res.status(200).send(apply);
    }
    catch (error) {
        console.log("🚀 ~ file: apply.controller.js ~ line 10 ~ createApply ~ error", error)
        res.status(500).send({ error });
    }
}

const getApplies = async (req, res) => {
    try {
        const applies=await Apply.find({});
        console.log("🚀 ~ file: apply.controller.js ~ line 18 ~ getApplies ~ applies", applies)
        res.status(200).send(applies);
    }
    catch (error) {
        console.log("🚀 ~ file: apply.controller.js ~ line 22 ~ getApplies ~ error", error)
        res.status(500).send({ error });
    }
}
module.exports = {
    createApply,
    getApplies,
};