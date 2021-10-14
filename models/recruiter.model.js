const mongoose = require('mongoose');

const recruiterSchema = mongoose.Schema({
    sum: {
        type: Number,
    },
    sumRaised: {
        type: String,default:0
    },
    campaign:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    donors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donor',
    }],
})

module.exports = mongoose.model('Recruiter', recruiterSchema)
