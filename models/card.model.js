const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
    sum: {
        type: Number,
    },
    text: {
        type: String,
    },
    gift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gift',
    },
})

module.exports = mongoose.model('Card', cardSchema)
