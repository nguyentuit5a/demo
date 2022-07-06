const mongoose = require('mongoose')

const Schema = mongoose.Schema

const User = Schema({
    email: {type: String},
    token: {type: String}
})

module.exports = mongoose.model('User', User)