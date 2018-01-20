const express = require('express')
    , app = express.Router()

app.get('/', (req,res) => {
    res.json('index');
});

module.exports = app;