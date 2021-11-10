const Apply = require("../models/apply.model");
const User = require("../models/user.model");
const { sendMail } = require("./recruiter.controller");

const createApply = async (req, res) => {
    try {
        const apply = await new Apply(req.body).save();
        const mailOptions = {
            to: 'giftmatching@gmail.com',
            subject: 'בקשה חדשה ליצירת קמפיין',
            html: `<h3>תוכן הבקשה הוא: ${apply.text}</h3>
            <p>
            לצפיה בכל הבקשות אנא הכנסי לקטגוריה בקשות בקישור
            https://matching-try.herokuapp.com/management
            </p>`
        }
        await sendMail(mailOptions);
        const applies = await Apply.find({}).populate({ path: 'user' }).sort({ status: 1 });
        console.log("🚀 ~ file: apply.controller.js ~ line 18 ~ createApply ~ applies", applies)
        res.status(200).send(applies);
    }
    catch (error) {
        res.status(500).send({ error });
    }
}

const getApplies = async (req, res) => {
    try {
        const applies = await Apply.find({}).populate({ path: 'user' }).sort({ status: 1 });
        res.status(200).send(applies);
    }
    catch (error) {
        res.status(500).send({ error });
    }
}

const confirmApply = async (req, res) => {
    try {
        const apply = await Apply.findByIdAndUpdate(req.params.applyId, { $set: { status: 1 } });
        const editUser = await User.findByIdAndUpdate(apply.user, { $set: { allowed: 1 } });
        console.log("🚀 ~ file: apply.controller.js ~ line 38 ~ confirmApply ~ editUser", editUser)
        const mailOptions = {
            to: editUser.email,
            subject: 'אושרה בקשה ליצירת קמפיין',
            html: `<p>
            ליצירת הקמפיין אנא הכנס לקטגוריה יצירת קמפיין בקישור:
            <br/>
            https://matching-try.herokuapp.com/management
             <br/>
        <b>הבקשה המאושרת היא:</b> ${apply.text}</p>`
        }
        await sendMail(mailOptions);
        const applies = await Apply.find({}).populate({ path: 'user' }).sort({ status: 1 });
        console.log("🚀 ~ file: apply.controller.js ~ line 51 ~ confirmApply ~ applies", applies)
        res.status(200).send(applies);
    }
    catch (error) {
        res.status(500).send({ error });
    }
}

module.exports = {
    createApply,
    getApplies,
    confirmApply,
};