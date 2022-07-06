const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Domain = Schema({
    name: {type: String}
})

module.exports = mongoose.model('Domain', Domain)