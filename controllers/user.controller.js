const User = require("../models/user.model");


const getUserByUid = async (req, res) => {
    try {
        let user = await User.findOne({ uid: req.params.uid });
        console.log("🚀 ~ file: user.controller.js ~ line 7 ~ getUserByUid ~ user", user)
        if (!user) {
            const newUser = await new User(req.params).save();
            console.log("🚀 ~ file: user.controller.js ~ line 10 ~ getUserByUid ~ newUser", newUser)
            user = await User.findById(newUser._id);
            console.log("🚀 ~ file: user.controller.js ~ line 12 ~ getUserByUid ~ user", user)
        }
        res.status(200).send(user);
    }
    catch (error) {
        console.log("🚀 ~ file: user.controller.js ~ line 11 ~ getUserByUid ~ error", error)
        res.status(500).send({ error });
    }
}
const createUser = async (req, res) => {
    try {
        const newUser = await new User(req.body).save();
        console.log("🚀 ~ file: user.controller.js ~ line 18 ~ createUser ~ newUser", newUser)
        const user = await User.findById(newUser._id);
        console.log("🚀 ~ file: user.controller.js ~ line 20 ~ createUser ~ user", user)
        res.status(200).send(user);
    }
    catch (error) {
        console.log("🚀 ~ file: user.controller.js ~ line 24 ~ createUser ~ error", error)
        res.status(500).send({ error });
    }
}

const updateUser = async (req, res) => {
    try {
        let updateUser = await User.findByIdAndUpdate(req.body._id, req.body);
        console.log("🚀 ~ file: user.controller.js ~ line 38 ~ updateUser ~ updateUser", updateUser)
        let user = await User.findById(updateUser._id);
        console.log("🚀 ~ file: user.controller.js ~ line 40 ~ updateUser ~ user", user)
        res.status(200).send(user);
    }
    catch (error) {
        console.log("🚀 ~ file: user.controller.js ~ line 44 ~ updateUser ~ error", error)
        res.status(500).send({ error });
    }
}

module.exports = {
    getUserByUid,
    createUser,
    updateUser,
};