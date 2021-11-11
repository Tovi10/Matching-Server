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
        default:0,
    },
})

module.exports = mongoose.model('Apply', applySchema)
