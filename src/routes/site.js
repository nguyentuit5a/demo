const express = require('express')
const { account, index, message, mailbox, read } = require('../app/controllers/Site')
const { verifyToken } = require('../app/middlewares/verifyToken')
const indexApi = require('../app/controllers/Api')
const router = express.Router()
router.get('/mailbox', verifyToken, mailbox)
router.get('/message/:id', verifyToken, message)
router.get('/account', account)
router.get('/read/:id', read)
router.get('/api', indexApi.index)
router.get('/domains', indexApi.getDomain)
router.get('/', index)
    
module.exports = router