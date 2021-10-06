const mongoose = require('mongoose');

const donorSchema = mongoose.Schema({
    adress: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    name: {
        type: String,
    },
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
    }],
})

module.exports = mongoose.model('Donor', donorSchema)
