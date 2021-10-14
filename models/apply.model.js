const mongoose = require('mongoose');

const applySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
    },
    status: {
        type: Number,
    },
})

module.exports = mongoose.model('Apply', applySchema)
