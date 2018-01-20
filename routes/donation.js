const express = require('express')
    , app = express()
    , Disaster = require('../models/disaster')

// fetching dummy info from JSON file 
const data = require('../data/data');

// ES5
app.get('/:_id', function (amount, req, res) {
    // do something..
    console.log('es5')
});

// ES6
// Return monitery brakdown of donation
app.get('/', (req, res) => {
    let donation = 50;
    let name = "Hurricane Irma";

    Disaster.getDisasterByName(name, (err, disaster) => {
        if (err) { throw err }
        disaster.map((i) => {
            let food = "$" + donation * i.donationBreakdown.food / 100;
            let water = "$" + donation * i.donationBreakdown.water / 100;
            let toiletries = "$" + donation * i.donationBreakdown.toiletries / 100;
            let cannedGoods = "$" + donation * i.donationBreakdown.cannedGoods / 100;


            let monetaryBreakdown = {
                food: food,
                water: water,
                toiletries: toiletries,
                cannedGoods: cannedGoods
            }
            res.json(monetaryBreakdown);
        });
    });
});

module.exports = app;