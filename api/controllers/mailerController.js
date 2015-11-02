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
        from: 'info@buzzo.me', // sender address
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



module.exports = function (backend) {
    MAILER.init();

    backend.MAILER = MAILER
}
