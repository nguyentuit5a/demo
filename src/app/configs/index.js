const config = require('./configs.json')
const mongoose = require('mongoose');

const db = async () => {
  try{

    const code = `mongodb+srv://${config.mongodb_user}:${config.mongodb_passwd}@${config.mongodb_url}/${config.mongodb_db}`
    await mongoose.connect(code, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Connect success fully')
  }
  catch(err){
      console.log(err)
  }
}

module.exports = db