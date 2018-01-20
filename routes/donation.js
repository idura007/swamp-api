// import { u } from '../../../../Library/Caches/typescript/2.6/node_modules/@types/tar';

const express = require('express')
    , app = express()
    , Disaster = require('../models/disaster')
    , Log = require('../models/log')

// fetching dummy info from JSON file 
const data = require('../data/data');

app.get('/', (req, res) => {
    res.json("Index");
})

// Return monitery brakdown of donation
app.get('/:_name', (req, res) => {
    let name = req.params._name;
    let donate = req.body.donate;

    Disaster.getDisasterByName(name, (err, disaster) => {
        if (err) { throw err; }
        res.json(disaster);
    });
});

app.post('/:_name', (req, res) => {
    let name = req.params._name;
    let donation = req.body.donation;

    Disaster.getDisasterByName(name, (err, disaster) => {
        if (err) { throw err }
        disaster.map((i) => {
            let amountRaised = i.amountRaised + donation;
            let id = i.id;

            let food = donation * i.donationBreakdown.food / 100;
            let water = donation * i.donationBreakdown.water / 100;
            let toiletries = donation * i.donationBreakdown.toiletries / 100;
            let cannedGoods = donation * i.donationBreakdown.cannedGoods / 100;

            let monetaryBreakdown = {
                food: food,
                water: water,
                toiletries: toiletries,
                cannedGoods: cannedGoods
            }

            Disaster.updateDisaster(id, amountRaised, {}, (err) => {
                if (err) { console.log(err); }
                else {
                    let log = {
                        name: i.name,
                        amountDonated: donation,
                        monetaryBreakdown: monetaryBreakdown
                    }
                    Log.addLog(log, (err) => {
                        if (err) { console.log(err); }
                        else { res.json('Success') }
                    });
                    res.json({
                        "breakdown": {
                            disasterBreakDown: {
                                name: i.name,
                                amountRaised: amountRaised,
                                monetaryBreakdown: {
                                    food: food,
                                    water: water,
                                    toiletries: toiletries,
                                    cannedGoods: cannedGoods
                                }
                            }
                        }
                    });
                }
            });
        });
    });
});


app.get('/test/:_name', (req, res) => {
    let name = req.params._name;
    let donation = 20;

    Disaster.getDisasterByName(name, (err, disaster) => {
        if (err) { throw err }
        disaster.map((i) => {
            let amountRaised = i.amountRaised + donation;

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

            let disaster = {
                name: i.name,
                amountRaised: amountRaised,
                monetaryBreakdown: monetaryBreakdown
            }
            res.json(disaster);
        });
    });
})
module.exports = app;