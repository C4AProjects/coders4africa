/**
 * Project: coders4africa
 * Created by Haythem Horbit on 29/10/2015.
 */
/**
 * Created by houcine on 21/05/15.
 */
var  _ = require('underscore');
var LIMIT_ROWS_DEFAULT = 10,
    LIMIT_ROWS = 100;
var utils=require('../utils/utils');

var WelcomMsg = "Thank you for pre-registering to CODERSAFRICA Africa's largest software developer Network <br>"+
"We are working on a new and exciting platform to replace the old site http://old.coders4africa.org/.<br>"+
"This new platform will allow members to learn to become better Software engineers ready to work on day one, or improve their skills. Our training model provide both hardcode technical and soft skills. Allowing members to network and collaborate better. Large enough to statisfy any skill level, technology and demography. Our network is a dream come through for African IT professionals. And finally provide jobs directly through CODERS4AFRICA's outsourcing services. And Indirectly through a Developer-As-A-Service (DaaS) serving clients across the world.<br>" +
"With your pre-registration you will be first to know when the new platform goes live.<br>"+
"Welcomde to codes4africa!<br>"+
"To know more about our achievement feel free to visit the old community site at http://old.coders4africa.org/<br>"

module.exports.add=function  (doc,callback){


    if (!doc.first_name)
    {
        callback("Veuillez ajouter un prenom");return;
    }
    if (!doc.last_name)
    {
        callback("Veuillez ajouter un nom");return;
    }
    if (!doc.email)
    {
        callback("Veuillez ajouter un email");return;
    }

    APP.USER.find({email:doc.email},function(err,users){
        if (err){console.log (err);callback(err)}
        if (users && users.length>0){
            callback("This Mail already registred")
        }else{
            var user=new APP.USER();
            user = _.extend(user, doc);


            user.save(function (er) {
                if (er )
                {callback(er)}
                else
                {

                    APP.MAILER.sendMail(WelcomMsg,doc.email);
                    callback(null, user)
                }
            });
        }
    })
}

/*Get user by id*/
module.exports.getById=function (userId,callback) {
    utils.getById(userId,callback,APP.USER)
}
module.exports.getAll=function (req,callback) {
    utils.getAll(req,callback,APP.USER)
}


/* update user*/
module.exports.update=function (userId,userData,callback) {



    utils.update(userId,userData,callback,APP.USER)
}
/* delete user*/
module.exports.delete=function (userId,callback) {

    utils.delete(userId,callback,APP.USER)
}

module.exports.query=function(req,callback){
    utils.query(req,callback,APP.USER)



}