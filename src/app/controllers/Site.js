const jwt = require("jsonwebtoken")
const { RdUser } = require("../functions/random")
const domain = require("../models/Domain")
const Mail = require("../models/Mail")
const User = require("../models/User")
const config = require('../configs/configs.json')
const index = async(req, res) => {
    return res.render('index.ejs')
}

const account = async(req, res) => {
    const user = await RdUser()
    const rddomain = await domain.aggregate().limit(1)

    if(rddomain.length == 0) return res.json({
        status: 'Error',
        msg: 'Not domain available'
    })
    const email = user +  '@' + rddomain[0].name
    
    const value = {email}

    token = jwt.sign(value, config.access_token_secret, {
        expiresIn: '365d'
    });

    const newUser = new User({
        email, token
    })
    await newUser.save()
    return res.json({
        status: 'success',
        email,
        token
    })
}

const mailbox = async(req, res) => {
    const email = req.Email
    const data = await Mail.find({email}, { html: 0, email: 0, uid: 0 })
    return res.json({
        status: 'success',
        data
    })
}

const message = async(req, res) => {
    const id = req.params.id
    const email = req.Email
    const data = await Mail.findOne({"_id": id, email})
    return res.json({
        status: 'success',
        data
    })
}

const read = async(req, res) => {
    const id = req.params.id
    const email = req.Email
    const data = await Mail.findOne({"_id": id, email})
    return res.render('emails/messages.ejs', data)
}

module.exports = {
    account, mailbox, message, index, read
}