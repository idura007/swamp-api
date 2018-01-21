const mongoose = require('mongoose');

let donationBreakdown = new mongoose.Schema({
    id: Number,
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

module.exports.getLogs = ((callback, limit) => {
    Log.find(callback).limit(limit);
});