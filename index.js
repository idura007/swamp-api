const express = require('express')
    , app = express()


app.get('/', (req,res) => {
    res.json('main');
});

app.listen(3000);