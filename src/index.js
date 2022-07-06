const express = require('express')
const app = express()
const path = require('path')
const imap = require('./app/functions/imap');
const route  = require('./routes')
const jwt = require('jsonwebtoken');
const db = require('./app/configs')
var cors = require('cors')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'resources/views'))
app.use(cors())

db()
route(app)

setInterval(() => {
    imap()
}, 3000)



app.listen(process.env.PORT || 5000, () =>{
    console.log('listen on port 3000')
})