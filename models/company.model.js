const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    logo: {
        type: String,
    },
    companyName: {
        type: String,
    },
    managerCompanyName: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
})

module.exports = mongoose.model('Company', companySchema);
