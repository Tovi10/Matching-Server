const mongoose = require('mongoose');

const giftSchema = mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    advertising: {
        type: String,
    },
    price: {
        type: Number,
    },
    amount: {
        type: Number,
    },
    numOfUsed: {
        type: Number,
    },
})

module.exports = mongoose.model('Gift', giftSchema)