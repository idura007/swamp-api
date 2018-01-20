const express = require('express')
    , app = express()
    , Disaster = require('../models/disaster')

// fetching dummy info from JSON file 
const data = require('../data/data');

// Return monitery brakdown of donation
app.get('/', (donation, name, req, res) => {
    if(donation == null || name == null) { res.json("ni pinga"); }
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