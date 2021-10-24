const User = require("../models/user.model");
const Recruiter = require("../models/recruiter.model");
const Campaign = require("../models/campaign.model");
const nodemailer = require('nodemailer');

const sendMail = (mailOptions) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'leader.meet.mail@gmail.com',
            pass: 'leadermeet123',
        }
    });
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(`error: ${error}`);
            throw Error('error in send mail')
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const createRecruiter = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            user = await new User(req.body).save();
        }
        console.log("🚀 ~ file: recruiter.controller.js ~ line 10 ~ createRecruiter ~ user", user)
        const recruiter = await new Recruiter({ ...req.body, user: user._id }).save();
        console.log("🚀 ~ file: recruiter.controller.js ~ line 13 ~ createRecruiter ~ recruiter", recruiter._id)
        const campaign = await Campaign.findByIdAndUpdate(req.body.campaign, {
            $push: {
                "recruiters": recruiter._id,
            }
        });
        console.log("🚀 ~ file: recruiter.controller.js ~ line 19 ~ createRecruiter ~ campaign", campaign)
        // Send an email to the new recruiter with the details and send him a link that will contain the recruiter;
        // const mailOptions = {
        //     to: req.body.email,
        //     text: ` you can share link http://localhost:3000/current-campaign/${campaign._id}`,
        //     // text: ` you can share link https://matching-try.herokuapp.com/current-campaign/${campaign._id}`,
        //     text: `שלום ${req.body.name}`
        // }
        // sendMail(mailOptions);
        res.status(200).send({ recruiter });
    }
    catch (error) {
        console.log("🚀 ~ file: recruiter.controller.js ~ line 24 ~ createRecruiter ~ error", error);
        res.status(500).send({ error });
    }
}

const updateRecruiterDetails = async (req, res) => {
    try {
        let recruiterId = req.params.recruiterId;
        let recruiter = await Recruiter.findByIdAndUpdate(recruiterId, { $set: { link: req.body.link } }).populate([{ path: 'user' }, { path: 'campaign' }]);
        console.log("🚀 ~ file: recruiter.controller.js ~ line 59 ~ updateRecruiterDetails ~ recruiter", recruiter);
        const mailOptions = {
            to: recruiter.user.email,
            // html: `<h3>שלום ${recruiter.user.name}</h3>
            // <p>לינק ישיר לקמפיין שלנו http://localhost:3000/current-campaign/${recruiter.campaign._id}</p>
            // <p>והלינק לאזור האישי שלך הוא : ${req.body.link}</p>`,
            html: `<h3>שלום ${recruiter.user.name}</h3>
            <p>אתה יכול לשתף את הלינק לקמפיין שלנו https://matching-try.herokuapp.com/current-campaign/${recruiter.campaign._id}</p><br/>
            <p>והלינק לאזור האישי שלך הוא : ${req.body.link}</p>`,
            // // text: `אתה יכול לשתף את הלינק לקמפיין שלנו https://matching-try.herokuapp.com/current-campaign/${campaign._id}`,
            // text: `שלום ${recruiter.user.name}`,
            // text: `והלינק לאזור האישי שלך הוא : ${req.body.link}`
        }
        sendMail(mailOptions);
        res.status(200).send({ recruiter });
    }
    catch (error) {
        console.log("🚀 ~ file: recruiter.controller.js ~ line 61 ~ updateRecruiterDetails ~ error", error);
        res.status(500).send({ error });
    }
}

const getRecruiterById = async (req, res) => {
    try {
        let id = req.params.id;
        let recruiter = await Recruiter.findById(id).populate({ path: 'campaign' });
        console.log("🚀 ~ file: recruiter.controller.js ~ line 85 ~ getRecruiterById ~ recruiter", recruiter)
        res.status(200).send({ recruiter });
    }
    catch (error) {
        console.log("🚀 ~ file: recruiter.controller.js ~ line 86 ~ getRecruiterById ~ error", error)
        res.status(500).send({ error });
    }
}

module.exports = {
    createRecruiter,
    updateRecruiterDetails,
    getRecruiterById,
    sendMail,
}