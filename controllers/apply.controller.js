const Apply = require("../models/apply.model");
const User = require("../models/user.model");

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
        const applies = await Apply.find({}).populate({ path: 'user' });
        console.log("🚀 ~ file: apply.controller.js ~ line 18 ~ getApplies ~ applies", applies)
        res.status(200).send(applies);
    }
    catch (error) {
        console.log("🚀 ~ file: apply.controller.js ~ line 22 ~ getApplies ~ error", error)
        res.status(500).send({ error });
    }
}

const confirmApply = async (req, res) => {
    try {
        const apply = await Apply.findByIdAndUpdate(req.params.applyId, { $set: { status: 1 } });
        console.log("🚀 ~ file: apply.controller.js ~ line 31 ~ confirmApply ~ apply", apply)
        const editUser = await User.findByIdAndUpdate(apply.user, { $set: { allowed: 1 } });
        console.log("🚀 ~ file: apply.controller.js ~ line 33 ~ confirmApply ~ editUser", editUser)
        const applies = await Apply.find({}).populate({ path: 'user' });
        console.log("🚀 ~ file: apply.controller.js ~ line 35 ~ confirmApply ~ applies", applies)
        res.status(200).send(applies);
    }
    catch (error) {
        console.log("🚀 ~ file: apply.controller.js ~ line 39 ~ confirmApply ~ error", error)
        res.status(500).send({ error });
    }
}

module.exports = {
    createApply,
    getApplies,
    confirmApply,
};