const mongoose = require('mongoose');

let donationBreakdown = new mongoose.Schema({
    food: Number,
    water: Number,
    toiletries: Number,
    cannedGoods: Number
});

let logSchema = mongoose.Schema({
    name: String,
    amountDonated: Number,
    donationBreakdown: donationBreakdown
});

let Log = module.exports = mongoose.model('Logs', logSchema);

module.exports.addLog = ((log, callback) => {
    Log.create(log, callback);
});