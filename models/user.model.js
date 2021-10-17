const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    uid: {
        type: String,
    },
    address: {
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
    allowed:{
        type:Boolean,
        default:0
    },
    campaigns:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign'
    }],
})

module.exports = mongoose.model('User', userSchema)
