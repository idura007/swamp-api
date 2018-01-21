const express = require('express')
    , app = express()
    , Disaster = require('../models/disaster')
    , Log = require('../models/log')

// fetching dummy info from JSON file 
const data = require('../data/data');

// Return all Logged donations
app.get('/all', (req, res) => {
    Log.getLogs((err, log) => {
        res.json(log)
    });
});

// Return monitery breakdown of donation
app.get('/:_name', (req, res) => {
    let name = req.params._name;
    let donate = req.body.donate;

    Disaster.getDisasterByName(name, (err, disaster) => {
        if (err) { console.log(err); }
        res.json(disaster);
    });
});

// Log when a donation is made to a disaster
app.post('/:_name', (req, res) => {
    let name = req.params._name;
    let donation = req.body.donation;
    if (donation == '' || donation == null) {
        res.json('Please enter a donation amount!');
    } else {
        Disaster.getDisasterByName(name, (err, disaster) => {
            if (err) { console.log(err); }
            else {
                let food = donation * disaster[0].donationBreakdown.food / 100
                    , water = donation * disaster[0].donationBreakdown.water / 100
                    , toiletries = donation * disaster[0].donationBreakdown.toiletries / 100
                    , cannedGoods = donation * disaster[0].donationBreakdown.cannedGoods / 100

                let log = [{
                    name: disaster[0].name,
                    id: disaster[0]._id,
                    amountDonated: donation,
                    donationBreakdown: {
                        food: food,
                        water: water,
                        toiletries: toiletries,
                        cannedGoods: cannedGoods,
                    }
                }]

                Log.addLog(log, (err, log) => {
                    if (err) { console.log(err); }
                    else { res.json(log); }
                })
            }
        });
    }
});

module.exports = app;