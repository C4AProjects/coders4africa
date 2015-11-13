/**
 * Project: coders4africa
 * Created by Haythem Horbit on 13/11/2015.
 */
/**
 * Project: coders4africa
 * Created by Haythem Horbit on 12/11/2015.
 */



var mailerCtrl=require("../controllers/mailerController")
//var authCtrl=require("../controllers/authController")
module.exports = function (app) {

    app.post(APP.APIPATH+"/msg", function(req, res){
        console.log("mailer route post")
        APP.  MAILER.sendMessage(req.body,function(err,doc){
            if (err)
                res.send({success:false,error:err})
            else{
                res.send({success:true,result:doc})
            }
        })

    });



}