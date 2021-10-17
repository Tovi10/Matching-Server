const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require("path");

// const { socketServer } = require('./webSocket');
// socketServer(http);
const { connectDB } = require('./db');
connectDB();
// const userRouter = require('./routes/user.route');
const campaignRouter = require('./routes/campaign.route');
const giftRouter = require('./routes/gift.route');
const cardRouter = require('./routes/card.route');
const companyRouter = require('./routes/company.route');
const userRouter = require('./routes/user.route');
const donationRouter = require('./routes/donation.route');

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//NOTE SERVER
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, './build')));
// app.use(express.static(path.join(__dirname, '../build')));
//NOTE SERVER
// app.get("/", (req, res, next) => {
//     // if (req.url.includes("home")) {
//     console.log("success@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
//     res.sendFile(path.join(__dirname, "./build/index.html"));
//     // res.status(200).send('<h1>hello</h1>');
//     // app.use(express.static(path.join(__dirname, './build')));
// });
app.get("/about", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});
app.get("/home", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});
app.get("/about", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});
app.get("/all-campaigns", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});
// app.get("/curren-campaign", (req, res, next) => {
//     res.sendFile(path.join(__dirname, "./build/index.html"));
// });
app.get("/current-campaign/:currentCampaign", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});
app.get("/create-campaign", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});
app.get("/new-campaign", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});
app.get("/personal", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});
app.get("/gift-details/:currentGift", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});

// app.use('/api/user', userRouter);
app.use('/api/campaign', campaignRouter);
app.use('/api/gift', giftRouter);
app.use('/api/card', cardRouter);
app.use('/api/company', companyRouter);
app.use('/api/user', userRouter);
app.use('/api/donation', donationRouter);

module.exports = {
    app, http
}
