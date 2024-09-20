const mongoose = require('mongoose')
const CONFIG = require('../config/config')

function connectToDB() {
    mongoose.connect(CONFIG.MONGODB_URL);

    mongoose.connection.on('connected', () => {
        console.log('connection to DB successful')
    })
    mongoose.connection.on('error', (err) => {
        console.log('connection to DB failed')
        console.log(err)
    })
}

module.exports = connectToDB;