/**
 * Created by macbookproretina on 18/04/15.
 */

var nodemailer = require('nodemailer');
var transporter ;
var MAILER = {}

MAILER.init=function(){
    console.log("Init Mailer...")
    transporter = nodemailer.createTransport("SMTP",APP.CONFIG.mailer);
    console.log(APP.CONFIG.mailer)
}

MAILER.sendMail=function(content,to){
    var mailOptions = {
        from: 'contact@coders4africa.org', // sender address
        to: to, // list of receivers
        subject: 'Coders4Africa', // Subject line
        // plaintext body
        html: content // html body
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
           // res.send({error: error});
        } else {


        }
    });

}


MAILER.sendMessage=function(msg,cb){
var content=msg.msg
    var mailOptions = {
        from: 'contact@coders4africa.org', // sender address
        to: "contact@coders4africa.org", // list of receivers
        subject: 'Coders4Africa Message From: '+ msg.name +" <"+msg.email+">", // Subject line
        // plaintext body
        html: content // html body
    };


    transporter.sendMail(mailOptions, cb);

}

MAILER.testMail=function(){
    var content="hola1"
    var mailOptions = {
        from: 'contact@coders4africa.org', // sender address
        to: "haythem.horbit@gmail.com", // list of receivers
        subject: 'Coders4Africa Message From:', // Subject line
        // plaintext body
        html: content // html body
    };


    transporter.sendMail(mailOptions, function(err){if (err) console.log(err)});
}
module.exports = function (backend) {
    MAILER.init();

    backend.MAILER = MAILER
}
