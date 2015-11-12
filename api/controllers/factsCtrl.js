/**
 * Project: coders4africa
 * Created by Haythem Horbit on 12/11/2015.
 */
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
    console.log("facts add")
    var user=new APP.FACTS();
    user = _.extend(user, doc);

console.log(user)
    user.save(function (er) {
        console.log("save")
        if (er )
        {callback(er)}
        else
        {

           
            callback(null, user)
        }
    });

}

/*Get user by id*/
module.exports.getById=function (userId,callback) {
    utils.getById(userId,callback,APP.FACTS)
}
module.exports.getAll=function (req,callback) {
    APP.FACTS.findOne({},callback)
}


/* update user*/
module.exports.update=function (userId,userData,callback) {



    utils.update(userId,userData,callback,APP.FACTS)
}
/* delete user*/
module.exports.delete=function (userId,callback) {

    utils.delete(userId,callback,APP.FACTS)
}

module.exports.query=function(req,callback){
    utils.query(req,callback,APP.FACTS)



}