const mongoose = require('mongoose');

const donationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter',
    },
    card: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
    },
    date: {
        type: String,
    }
})

module.exports = mongoose.model('Donation', donationSchema)
