const Recruiter = require("../models/recruiter.model");
const Campaign = require("../models/campaign");

const createRecruiter = async (req, res) => {
    try {
        const ansRecruiter = await new Recruiter(req.body).save();
        console.log("🚀 ~ file: recruiter.controller.js ~ line 6 ~ createRecruiter ~ ansRecruiter", ansRecruiter);
        const campaign = await Campaign.findByIdAndUpdate(req.params.campaignId, {
            $push: {
                "recruiters": ansRecruiter._id,
            }
        });
        res.status(200).send({ ansRecruiter });
    }
    catch (error) {
        console.log("🚀 ~ file: recruiter.controller.js ~ line 10 ~ createRecruiter ~ error", error);
        res.send({error});
    }
}



export {
    createRecruiter,
}