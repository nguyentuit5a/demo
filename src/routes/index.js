const siteRouter = require('./site')
const apiRouter = require('./api')
module.exports = (app) =>{
    app.use('/', siteRouter)
}