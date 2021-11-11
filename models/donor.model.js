const mongoose = require('mongoose');

const donorSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
  
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
    }],
})

module.exports = mongoose.model('Donor', donorSchema)
