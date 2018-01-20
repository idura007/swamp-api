
const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , ejs = require('ejs')
    , expressValidator = require('express-validator')
    , helmet = require('helmet')
    , logger = require('morgan')
    , app = express.Router()
    , path = require('path')

module.exports = (app) => {
    app.use(logger('dev'));
    app.set('view engine', 'ejs');

    // Express Middleware
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    // Express Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use((err, req, res, next) =>
        res.status(500).send(JSON.stringify({ err: 'Bad API Request!' }))
    );

    // Route Configuration
    const index = require('../routes/index');
    const disaster = require('../routes/disaster');
    const donation = require('../routes/donation');

    app.use('/', index);
    app.use('/disasters', disaster);
    app.use('/donation', donation);
};