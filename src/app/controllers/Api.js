const domain = require("../models/Domain")

const index = async(req, res) => {
    res.render('api/index.ejs')
}

const getDomain = async(req, res) => {
    const data = await domain.find({})
    return res.json({
        status: 'success',
        data
    })
}


module.exports = {
    index, getDomain
}