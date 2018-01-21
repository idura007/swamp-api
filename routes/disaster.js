const express = require("express")
    , app = express.Router()
    , Disaster = require('../models/disaster')

// fetching dummy info from JSON file 
const data = require('../data/data');

// displays all disasters -> /disasters
app.get('/', (req, res) => {
    Disaster.getDisasters((err, disaster) => {
        res.json(disaster)
    });
});

// Get disaster by ID
app.get('/:_id', (req, res) => {
    Disaster.getDisasterById(req.params._id, (err, disaster) => {
        if (err) { throw err; }
        res.json(disaster);
    });
});

// Get disaster by name
app.get('/name/:_name', (req, res) => {
    let name = req.params._name;
    Disaster.getDisasterByName(name, (err, disaster) => {
        if (err) { throw err; }
        res.json(disaster);
    });
});

// Delete disaster from DB
app.delete('/:_id', (req, res) => {
    let id = req.params._id;
    Disaster.removeDisaster(id, (err, disaster) => {
        if (err) { throw err; }
        res.json("Deleted: " + id);
    });
});

// Post a disaster
app.post('/', (req, res) => {
    let disasterArray = [];
    data.map((i) => {
        let id = i.id
            , name = i.name
            , img = i.img
            , amountRaised = i.amountRaised
            , food = i.donationBreakdown.food
            , water = i.donationBreakdown.water
            , toiletries = i.donationBreakdown.toiletries
            , cannedGoods = i.donationBreakdown.cannedGoods

        disasterArray.push({
            id: id,
            img: img,
            name: name,
            amountRaised: amountRaised,
            donationBreakdown: {
                food: food,
                water: water,
                toiletries: toiletries,
                cannedGoods: cannedGoods
            }
        });
    });

    Disaster.addDisaster(disasterArray, (err, disaster) => {
        if (err) { console.log(err); }
        else { res.json('Success') }
    });
});

module.exports = app;