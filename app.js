const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require("path");

const { socketServer } = require('./webSocket');
socketServer(http);
const { connectDB } = require('./db');
connectDB();
const campaignRouter = require('./routes/campaign.route');
const giftRouter = require('./routes/gift.route');
const cardRouter = require('./routes/card.route');
const companyRouter = require('./routes/company.route');
const userRouter = require('./routes/user.route');
const donationRouter = require('./routes/donation.route');
const recruiterRouter = require('./routes/recruiter.route');
const applyRouter = require('./routes/apply.route');

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './build')));

// app.get("/*", (req, res, next) => {
//     res.sendFile(path.join(__dirname, "./build/index.html"));
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
app.get("/recruiters/:recruiterId", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});
app.get("/management", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.get("/thank", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.get("&response=failure&json=eyJlcnIiOnsiaWQiOjM0MywibWVzc2FnZSI6Iteg15Ag15zXpNeg15XXqiDXnNee16DXlNecINee16LXqNeb16ogMzE0NCoifSwic3RhdHVzIjoiMCIsImRhdGEiOnsiaWQiOiIxMzcxNDc4MiIsIm5ld19wYXltZW50X2lkIjoxMzcxNDc5MX19&data_url=https://cgmpi.creditguard.co.il/CGMPI_Server/PerformTransaction", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});
app.get("/thank/:x*", (req, res, next) => {
    if (req.url.split('&')[1].split('response=')[1] == "failure")
        res.redirect('https://matching-try.herokuapp.com/failure/')
    else
        res.redirect('https://matching-try.herokuapp.com/thank/')
});


app.use('/api/campaign', campaignRouter);
app.use('/api/gift', giftRouter);
app.use('/api/card', cardRouter);
app.use('/api/company', companyRouter);
app.use('/api/user', userRouter);
app.use('/api/donation', donationRouter);
app.use('/api/recruiter', recruiterRouter);
app.use('/api/apply', applyRouter);

module.exports = {
    app, http
}
