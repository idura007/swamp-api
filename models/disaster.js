const mongoose = require('mongoose');

let donationBreakdown = new mongoose.Schema({
    food: Number,
    water: Number,
    toiletries: Number,
    cannedGoods: Number
})

let disasterSchema = mongoose.Schema({
    name: String,
    amountRaised: Number,
    img: String,
    donationBreakdown: donationBreakdown
});

let Disaster = module.exports = mongoose.model('Disaster', disasterSchema);

module.exports.addDisaster = ((disaster, callback) => {
    Disaster.create(disaster, callback);
});

module.exports.getDisasters = ((callback, limit) => {
    Disaster.find(callback).limit(limit);
})

module.exports.getDisasterById = (id, callback) => {
    Disaster.findById(id, callback);
}

module.exports.getDisasterByName = (name, callback) => {
    Disaster.find({ name: name }, callback);
}

module.exports.removeDisaster = (id, callback) => {
    let query = { _id: id };
    Disaster.remove(query, callback);
}

module.exports.updateDisaster = (id, amountRaised, options, callback) => {
    var query = { _id: id };
    var update = {
        amountRaised: amountRaised
    }
    Disaster.findOneAndUpdate(query, update, options, callback);
}
