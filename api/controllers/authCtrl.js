/**
 * Project: coders4africa
 * Created by Haythem Horbit on 29/10/2015.
 */

var  _ = require('underscore');
SALT_WORK_FACTOR = 10;

var jwt = require('jsonwebtoken');

var utils=require('../utils/utils');
var randomstring = require('just.randomstring');


module.exports.authenticate = function(userData, callback) {
    if (!userData.email)
    {
        callback("Veuillez saisir votre email");return;
    }
    if (!userData.password)
    {
        callback("Veuillez saisir un mot de passe");return;
    }
    APP.USER.findOne({ email: userData.email }, function(err, user) {
        if (err)
            return callback(err);
        // make sure the user exists
        if (!user) {
            callback("Veuillez vérifier votre nom d\'email");return;
        }
        // test for a matching password
        user.verifyPassword(userData.password, function(err, isMatch) {

            if(err) {
                return callback(err);
            }

            if(!isMatch) {
                return callback('password provided is invalid');
            }
            var token = jwt.sign({user:user}, APP.CONFIG.API.secret,{ expiresInMinutes: APP.CONFIG.API.expireSession });




            callback(null, {
                token:token});


        });
    })
}