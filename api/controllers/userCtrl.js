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
    if (!doc.password)
    {
        callback("Veuillez ajouter un mode de passe");return;
    }

    var user=new APP.USER();
    user = _.extend(user, doc);
    user.save(function (er) {
        if (er )
        {callback(er)}
        else
        {

            APP.  MAILER.sendMail("<b>Welcome to Coders For Africa</b>",doc.email);
            callback(null, user)
        }
    });
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