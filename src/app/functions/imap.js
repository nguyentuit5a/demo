const Mail = require('../models/Mail');
const User = require('../models/User');
const moment = require(('moment'))
module.exports = () => {
    var Imap = require('imap'),
    inspect = require('util').inspect;
    const simpleParser = require('mailparser').simpleParser;

    var imap = new Imap({
    user: 'admin@tempmailll.ml',
    password: 'Fakepw1-',
    host: 'imap.yandex.com',
    port: 993,
    tls: true
    });
    
    async function parse_email(body) {
        let parsed = await simpleParser(body, 'address');
        return parsed
    };

    function openInbox(cb) {
    imap.openBox('INBOX', false, cb);
    }
    
    imap.once('ready', function() {
        openInbox(function(err, box) {
          if (err) throw err;
    
          imap.search(['ALL', ['SINCE', 'May 20, 2018']], function(err, results){
            if (err) console.log('errr')
            if(results.length == 0) return imap.end();
            var f = imap.fetch(results, {bodies: ''});
            f.on('message', function(msg, seqno) {
              console.log('Message #%d', seqno);
              var prefix = '(#' + seqno + ') ';
              msg.on('body',async function(stream, info) {
                if (info.which === 'TEXT')
                  console.log(prefix + 'Body [%s] found, %d total bytes', inspect(info.which), info.size);
                  var buffer = '', count = 0;
                  stream.on('data', function(chunk) {
                    count += chunk.length;
                    buffer += chunk.toString('utf8');
                    parse_email(buffer);
                    if (info.which === 'TEXT')
                      console.log(prefix + 'Body [%s] (%d/%d)', inspect(info.which), count, info.size);
                  });
                  try {
                      stream.once('end',async function() {
                        if (info.which !== 'TEXT')
                          {
                            try {
                              const fullMail = await parse_email(buffer)
                              const email = (/[A-Za-z0-9@.]{0,}>/.exec(fullMail.to.text))[0].replace('>','')
                              console.log(email)
                              const dataUser = await User.findOne({email})
                              if(dataUser){
                                  const from =  /\S+@\S+\.\S+/.exec(fullMail.from.text).toString().replace('>','').replace('<', '')
                                  const sender = (fullMail.from.text).replace(from, '').replace('>','').replace('<', '')
                                  const subject = fullMail.subject
                                  const time = moment().locale('us').format('lll')
                                  
                                  let html
                                  try {
                                    html = /<body[^>]*>([\w|\W]*)<\/body>/.exec(fullMail.html)[0]
                                  } catch (error) {
                                    html = fullMail.html
                                  } 
                                  let dataMail = new Mail({
                                      email, from, sender, subject, html, time
                                  })
  
                                  await dataMail.save()
                              }
                            } catch (error) {
                              console.log(error)
                            }
                          }
                        else
                          {console.log(prefix + 'Body [%s] Finished', inspect(info.which));}
                        
                      });
                  } catch (error) {
                      console.log('errr')
                  }
              });
                msg.once('attributes',async function(attrs) {
                        console.log(attrs)
                        imap.addFlags(attrs.uid, 'Deleted', function(err) {
                            if (err)  throw err;
                            console.log('Email archived');
                        });
                });
                msg.once('end', function() {
                    console.log(prefix + 'Finished');
                });
            });
    
            f.once('error', function(err) {
              console.log('Fetch error: ' + err);
            });
    
            f.once('end', function() {
              console.log('Done fetching all messages');
              imap.end();
            });
    
          });
        });
      });
    
      imap.once('error', function(err) {
        console.log(err);
      });
    
      imap.once('end', function() {
      });
    
      imap.connect();
}