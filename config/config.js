require('dotenv').config({ path: '.env' });

module.exports = {
    dev: {
      port: process.env.port || 3050,
      db  : process.env.dev_db 
    },
    production: {
        // TODO!
    }
  }