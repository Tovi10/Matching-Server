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
})

module.exports = mongoose.model('User', userSchema)
