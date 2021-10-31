const mongoose = require('mongoose');

const recruiterSchema = mongoose.Schema({
    sum: {
        type: Number,
    },
    sumRaised: {
        type: Number,
        initialValue: 0
    },
    designName: {
        type: String,
    },
    link: {
        type: String,
    },
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    // donors: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Donor',
    // }],
})

module.exports = mongoose.model('Recruiter', recruiterSchema)
