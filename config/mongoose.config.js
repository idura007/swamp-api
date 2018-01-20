let mongoose = require('mongoose')

// activating Promises for mongoose
mongoose.Promise = global.Promise;

module.exports = (config) => {

    var dbURI = config.dev.db;

    // using new syntax for mongoose library
    mongoose.connect(dbURI, {
        // useMongoClient: true,
    }).then(() => {
        console.log(`Connected to.. ${dbURI}`);
        console.log(`http://localhost:${config.dev.port}/`);
    }).catch((e) => {
        throw e;
    });
};