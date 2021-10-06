const Company = require('../models/company.model');

const getAllCompanies = async (req, res) => {
    try {
        let allCompanies = await Company.find();
        console.log("🚀 ~ file: company.controller.js ~ line 6 ~ getAllCompanies ~ allCompanies", allCompanies)
        res.status(200).send(allCompanies);
    }
    catch (error) {
        console.log("🚀 ~ file: company.controller.js ~ line 10 ~ getAllCompanies ~ error", error)
        res.status(500).send({ error });;
    }
}

const getCompanyById = async (req, res) => {
    try {
        let company = await Company.findById(req.params.id);
        console.log("🚀 ~ file: company.controller.js ~ line 18 ~ getCompanyById ~ company", company)
        res.status(200).send(company);
    }
    catch (error) {
        console.log("🚀 ~ file: company.controller.js ~ line 22 ~ getCompanyById ~ error", error)
        res.status(500).send({ error });;
    }
}

const createCompany = async (req, res) => {
    try {
        let ansCompany = await new Company(req.body).save();
        console.log("🚀 ~ file: company.controller.js ~ line 29 ~ createCompany ~ ansCompany", ansCompany)
        let allCompanies = await Company.find();
        console.log("🚀 ~ file: company.controller.js ~ line 32 ~ createCompany ~ allCompanies", allCompanies)
        res.status(200).send(allCompanies);
    }
    catch (error) {
        console.log("🚀 ~ file: company.controller.js ~ line 33 ~ createCompany ~ error", error)
        res.status(500).send({ error });;
    }
}

const updateCompany = async (req, res) => {
    try {
        let updateCompany = await Company.findByIdAndUpdate(req.body._id, req.body);
        console.log("🚀 ~ file: company.controller.js ~ line 44 ~ updateCompany ~ updateCompany", updateCompany)
        let company = await Company.findById(updateCompany._id);
        res.status(200).send(company);
    }
    catch (error) {
        console.log("🚀 ~ file: company.controller.js ~ line 49 ~ updateCompany ~ error", error)
        res.status(500).send({ error });
    }
}

module.exports = {
    getAllCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
};
