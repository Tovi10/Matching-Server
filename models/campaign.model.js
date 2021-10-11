const mongoose = require('mongoose');

const campaignSchema = mongoose.Schema({
    campaignName: {
        type: String,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
    purposeOfCollecting: {
        type: String,
    },
    images: [{
        type: String,
    }],
    goal: {
        type: Number,
    },
    goalRaised: {
        type: Number,
        default: 0,
    },
    duration: [{
        type: String
    }],
    recruiters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter',
    }],
    donors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donor',
    }],
    donations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation',
    }],
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
    }],
})

module.exports = mongoose.model('Campaign', campaignSchema)
