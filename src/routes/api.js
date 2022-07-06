const express = require('express')
const { index, getDomain } = require('../app/controllers/Api')
const router = express.Router()
router.get('/domains', getDomain)
router.get('/', index)
    
module.exports = router