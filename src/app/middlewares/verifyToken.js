const config = require('../configs/configs.json')
const jwt = require('jsonwebtoken')
const verifyToken = async(req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) return res.sendStatus(401)
        
    try {
        const decoded = jwt.verify(token, config.access_token_secret)
        req.Email = decoded.email
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    verifyToken
}