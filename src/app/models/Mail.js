const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Mail = Schema({
    sender: {type: String},
    subject: {type: String},
    from: {type: String},
    html: {type: String},
    time: {type: String},
    email: {type: String}
})

module.exports = mongoose.model('Mail', Mail)